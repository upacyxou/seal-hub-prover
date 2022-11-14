/* eslint-disable no-relative-import-paths/no-relative-import-paths */
// Used by worker, which accepts only absolute paths, you can use this function as usual
import * as BN from 'bn.js'
import * as elliptic from 'elliptic'
import { BigIntOrString } from '@/models/BigIntOrString'
import { ProofInput } from '@/models/ProofInput'
import { cwd } from 'process'
import { hashPersonalMessage } from '@ethereumjs/util'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { utils } from 'ethers'
import ProofResult from '@/models/ProofResult'
import snarkjs from 'snarkjs'
import splitToRegisters from '@/helpers/splitToRegisters'

const ec = new elliptic.ec('secp256k1')
const STRIDE = 8n
const NUM_STRIDES = 256n / STRIDE // = 32

const SECP256K1_N = new BN(
  'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
  16
)

interface ExtendedBasePoint extends elliptic.curve.base.BasePoint {
  x: BN
  y: BN
}

const getPointPreComputes = (point: ExtendedBasePoint) => {
  console.log('points')
  const keyPoint = ec.keyFromPublic({
    x: Buffer.from(point.x.toString(16), 'hex').toString('hex'),
    y: Buffer.from(point.y.toString(16), 'hex').toString('hex'),
  })
  console.log('whyyy')
  const gPowers = [] as BigIntOrString[][][][]
  console.log('started generating')
  for (let i = 0n; i < NUM_STRIDES; i++) {
    const stride: BigIntOrString[][][] = []
    const power = 2n ** (i * STRIDE)
    for (let j = 0n; j < 2n ** STRIDE; j++) {
      const l = j * power
      const gPower = keyPoint
        .getPublic()
        .mul(new BN(l.toString())) as ExtendedBasePoint
      const x = splitToRegisters(gPower.x)
      const y = splitToRegisters(gPower.y)
      stride.push([x, y])
    }
    gPowers.push(stride)
  }
  console.log('generated')
  return gPowers
}

export function generateInput(signature: string, message: string) {
  const msgHash = hashPersonalMessage(Buffer.from(message))
  const { v, r, s } = utils.splitSignature(signature)
  console.log('asdasdasd')
  const biV = BigInt(v)
  const biR = new BN(r.slice(2, r.length), 'hex')
  const hexS = s.slice(2, s.length)
  console.log('proc')
  const isYOdd = (biV - BigInt(27)) % BigInt(2)
  const rPoint = ec.keyFromPublic(
    ec.curve.pointFromX(new BN(biR), isYOdd).encode('hex'),
    'hex'
  )
  console.log('lag')
  // Get the group element: -(m * r^−1 * G)
  const rInv = new BN(biR).invm(SECP256K1_N)

  // w = -(r^-1 * msg)
  const w = rInv.mul(new BN(msgHash)).neg().umod(SECP256K1_N)
  // U = -(w * G) = -(r^-1 * msg * G)
  const U = ec.curve.g.mul(w)

  // T = r^-1 * R
  const T = rPoint.getPublic().mul(rInv) as ExtendedBasePoint
  console.log('hsjdfhjsd')
  const TPreComputes = getPointPreComputes(T)
  console.log('ret')
  return {
    TPreComputes,
    U: [splitToRegisters(U.x), splitToRegisters(U.y)],
    s: [splitToRegisters(hexS)],
  }
}

export default function build(input: ProofInput): Promise<ProofResult> {
  //   const files = await getECDSACheckerFiles()
  const wasm = readFileSync(resolve(cwd(), './zkp/ECDSAChecker.wasm'))
  const zkey = readFileSync(resolve(cwd(), './zkp/ECDSAChecker_final.zkey'))
  console.log(wasm)
  return snarkjs.groth16.fullProve(input, wasm, zkey)
}
