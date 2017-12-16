import IdeaFactoryJson from '~/build/contracts/IdeaFactory.json'
import Contract from './base/Contract'

let instance

class IdeaFactory extends Contract {
  constructor () {
    super()
    this.json = IdeaFactoryJson
    instance = instance || this
    return instance
  }

  createIdea (state, name, ticker, metaHash, cover) {
    const web3 = state.web3.instance().utils
    return this.method(state, 'createIdea', web3.asciiToHex(name), web3.asciiToHex(ticker), this.fromIPFSHash(metaHash), this.fromIPFSHash(cover))
  }

  // fromIPFSHash (hash) {
  //   const bytes = bs58.decode(hash)
  //   const multiHashId = 2
  //   // remove the multihash hash id
  //   return bytes.slice(multiHashId, bytes.length)
  // }

  // toIPFSHash (str) {
  //   // remove leading 0x
  //   const remove0x = str.slice(2, str.length)
  //   // add back the multihash id
  //   const bytes = Buffer.from(`1220${remove0x}`, "hex")
  //   const hash = bs58.encode(bytes)
  //   return hash
  // }

  // editProfile (state, data) {
  //   const web3 = state.web3.instance().utils
  //   return this.method(state, 'update', web3.asciiToHex(data.firstName), web3.asciiToHex(data.lastName), web3.asciiToHex(data.email))
  // }
  // signup (state, data) {
  //   const web3 = state.web3.instance().utils
  //   return this.method(state, 'signup', web3.asciiToHex(data.firstName), web3.asciiToHex(data.lastName), web3.asciiToHex(data.email))
  // }

  // login (state) {
  //   return this.constant(state, 'login').then(result => this.getUTF8DataOfResults(state, result))
  // }

  // getUTF8DataOfResults (state, results) {
  //   console.log('login', results)
  //   const utf8Results = Object.values(results).map(result => state.web3.instance().utils.toUtf8(result))
  //   return {
  //     firstName: utf8Results[0],
  //     lastName: utf8Results[1],
  //     email: utf8Results[2]
  //   }
  // }
}

export default new IdeaFactory()
