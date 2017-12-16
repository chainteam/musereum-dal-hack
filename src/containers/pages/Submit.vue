<template lang="pug">
  el-row
    el-col(:span='16' :offset='4')
      h2 Submit Music Asset
        
      el-steps(:active='currentStep' style='margin-bottom: 40px')
        el-step(title='Create', description='Register rights on asset')
        el-step(title='Tokenize', description='Configure rights token')
        el-step(title='Offer', description='Get money to implement')

      el-row(:gutter='40' style='margin-bottom: 60px;')
        el-col(:span='16')
          //- Content here
          el-row(v-if='currentStep === 0')
            el-col(:span='24')
              h3 Asset Details
              el-form(label-position='top', label-width='100px', :model='asset')
                .flex
                  .flex-item.flex-item_grow
                    el-form-item(label='Audio Image')
                      el-upload.audio-uploader(
                        action=''
                        drag
                        :show-file-list='false'
                        :http-request='uploadAudio'
                        v-loading='asset.audioLoading')
                        img.cover(v-if='audioUrl', :src='audioUrl')
                        i.el-icon-plus.uploader-icon(v-else='')
                  .flex-item
                    el-form-item(label='Asset Logotype')
                      el-upload.cover-uploader(
                        action=''
                        drag
                        :show-file-list='false'
                        :http-request='uploadCover'
                        v-loading='asset.coverLoading')
                        img.cover(v-if='coverUrl', :src='coverUrl')
                        i.el-icon-plus.uploader-icon(v-else='')
                el-form-item(label='Asset Name')
                  el-input(v-model='asset.name')
                el-row.submit-asset__description(:gutter='20' type='flex')
                  el-col.submit-asset__description-col.submit-asset__description-col_textarea(:span='12')
                    el-input.submit-asset__description-textarea(
                      type="textarea" 
                      v-model='asset.description'
                    )
                  el-col.submit-asset__description-col.submit-asset__description-col_output(:span='12')
                    div.submit-asset__description-output.markdown-output(v-html='compiledDescription')                        
                el-form-item(label='Asset Type')
                  el-cascader(
                    placeholder='Genre'
                    :options='assetTypes'
                    v-model='asset.type'
                    style='width: 100%'
                  )
          el-row(v-if='currentStep === 1')
            el-col(:span='24')
              h3 Token Details
              el-form(label-position='left' label-width='100px' :model='asset' ref='createAssetForm')
                el-form-item(label='Token Name' prop='name')
                  el-input(v-model='asset.token.name' @change="valid")
                el-form-item(label='Token Ticker' prop='ticker')
                  el-input(v-model='asset.token.ticker' @change="valid")
                el-form-item(label='Decimals' prop='decimals')
                  el-input(v-model.number='asset.token.decimals' type="number" @change="valid")

          el-form(label-position='left' label-width='100px' :model='asset' ref='createAssetForm' v-if='currentStep === 2' )
            el-row(:gutter='20')
              el-col(:span='24')
                h3 Setup Invest Round
              el-col(:span='24')
                  el-row(:gutter='20')
                    el-col(:span='8')
                      el-form-item(label='Start Date' prop='name')
                        el-date-picker(v-model='asset.ico.startRaw', type='date', placeholder='Pick a start date')
                    el-col(:span='8')
                      el-form-item(label='End Date' prop='name')
                        el-date-picker(v-model='asset.ico.endRaw', type='date', placeholder='Pick a end date')
              el-col(:span='24' v-if='icoDuration')
                h4 {{icoDuration}} day of crowdsale with a rules:
                
              el-col(:span='8' v-if='icoDuration')
                el-form-item(label='Cap' prop='name')
                  el-input(v-model.number='asset.ico.capPart' type="number")
                    span(slot='suffix') %
              el-col(:span='8' v-if='icoDuration')
                el-form-item(label='Total Supply' prop='name')
                  el-input(:value='1e6' type="number" :disabled='true')
                    span(slot='suffix') {{ asset.token.ticker }}
                    span(slot='prefix') of

            el-row(:gutter='20' v-if='icoAmount')
              el-col(:span='8')
                h4 {{icoAmount}} {{ asset.token.ticker }} will be offered with a price:

            el-row(:gutter='20' v-if='icoAmount')
              el-col(:span='8' v-if='icoDuration')
                el-form-item(label='Base Price' prop='name')
                  el-input(v-model='asset.ico.price' type="number")
                    span(slot='suffix') ETH
              el-col(:span='8' v-if='icoDuration')
                el-form-item(:label='`for 1 ${this.asset.token.ticker}`' prop='name')
            
            el-row(:gutter='20' v-if='asset.ico.price')
              h4 Bonuses:
              el-tabs(v-model='activeBonuse')
                el-tab-pane(label='Referal', name='first') Referal
                el-tab-pane(label='Amount', name='second') Amount
                el-tab-pane(label='Time', name='third') Time
                el-tab-pane(label='Personal', name='fourth') Personal

          el-row(:gutter='20' v-if='currentStep === 3')
            el-col(:span='20' :offset='2' style='padding: 120px 60px; background-color: #efece1')
              div(style='font-family: "CMU Serif", monospace')
                h3 {{ asset.name }} SALE AGREEMENT FOR FUTURE TOKENS (Second Round, Pre-Sale) 
                p 
                  span
                  | THIS CERTIFIES THAT in exchange for payment by The Buyer (this is a public offer, 
                  | applicable to any purchaser, who participates in the process (the “
                  strong Buyer
                  span 
                  | ”) with a base price of 
                  strong  {{ asset.ico.price }} ETH 
                  span to 
                  strong {{ asset.name }}
                  span
                  |, a DAO created on Yolo platform hereby issues to the Buyer the right to cryptographic tokens to be sold by 
                  strong {{ asset.name }} 
                  span in a future token sale on the terms set forth below. 
                  ol
                    li 
                      strong Defined Terms
                      span . Additional defined terms not defined throughout the agreement are: 
                      div
                        strong “Bonus” 
                        span is the Purchase Amount shall be (а) 10% for early-birds and 15% for amount more than 1000 ETM in "Initial Token Sale"
                        span is the future sale of Token by 
                        strong {{ asset.name }}. 
                        span “Tokens” are tokens to be sold by 
                        strong {{ asset.name }}
                        span in its Initial Token Sale, which is targeted to launch in 
                        strong {{ asset.ico.startRaw }} 
                        span ICO with definitive terms and conditions to be set forth at that time which will be sold until 
                        strong {{ asset.ico.endRaw }} 
                        strong “Purchase Amount” 
                        span is the amount set forth in the preamble to this agreement and to be paid by Buyer to I 
                        strong {{ asset.name }}
                        span upon execution of this agreement for the right to buy MPAQ Tokens in the Initial Token Sale. 
                        span The value of the Purchase Amount shall be deemed in U.S. dollars whether Buyer pays in Bitcoin, Ether, Zcash 
                        span or any other crypto currency, valued at the applicable exchange rate at the time, which means the volume-weighted 
                        span hourly price of the currency across exchanges in the one hour preceding and one hour after receipt of the currency 
                        span by the company as reasonably determined by the company. 
                        strong “Dissolution Event” 
                        span means: (i) a voluntary termination of operations; (ii) a general assignment for the benefit of 
                        strong {{ asset.name }}
                        span ’s creditors, or (iii) any other liquidation, dissolution or winding up of 
                        strong {{ asset.name }} 
                    li 
                      strong Pre-Sale and Initial Sale. 
                      ol
                        li 
                          span Buyer agrees and acknowledges that 
                          strong {{ asset.name }}
                          span is conducting a pre-sale of its Tokens and that the final terms and conditions of the Tokens will be set forth in the 
                          span documentation for the Initial Token Sale. This second round pre-sale will be limited to a total aggregate purchase limit of 
                          strong {{ icoAmount * asset.ico.price }}
                          span 
                          | = 
                          strong {{ asset.ico.price }} 
                          span
                          | * 
                          strong {{ icoAmount }}
                          span on a first come first bought basis. 
                          strong {{ asset.name }} 
                          span may, at its sole discretion, elect to increase the purchase limit of the second round pre-sale amount.
                        li Buyer agrees and acknowledges that s/he/it has had an opportunity to review/discuss the functionality of the Token and has read and understood {{ asset.name }}’s materials describing the company and the Token.
                        li
                          strong {{ asset.name }}  
                          span hereby issues Buyer the right to buy Tokens in the Initial Token Sale pursuant to the terms and conditions of this agreement (the “Pre-Sale Right”). 
                        li 
                          span Buyer agrees and acknowledges that neither the Pre-Sale Right nor the Token grants Buyer any: 
                          ol
                            li ownership rights in {{ asset.name }}
                            li return on investment from a future issuance of an Token; or
                            li profit or passive income from holding an Token.
                        li Buyer represents that s/he/it is not a citizen or resident of, not located in or have a primary residence or domicile in the People’s Republic of China, in a country subject to sanctions under OFAC regulations, a person subject to sanctions under OFAC regulations or in any jurisdiction in which access to or use of cryptocurrency or digital tokes is prohibited by law, decree, regulation, treaty or administrative act.
                        li Upon closing of the Initial Token Sale, {{ asset.name }} shall automatically issue to Buyer in exchange for the Pre-Sale Right a number of Tokens equal to: (1) the Purchase Amount divided by the Round Rate plus (2) a number of Tokens equal to the Bonus.
                        li If the Initial Token Sale is offered at different prices depending upon the time at which Tokens are purchased, the Purchase Amount will be calculated at the most advantageous rate publicly marketed. 
                        li Buyer agrees and acknowledges that the purchase of the Pre-Sale Right is final and the Purchase Amount is non-refundable, except that if the Initial Token Sale fails to achieve a minimum sale of Tokens set by {{ asset.name }}, then {{ asset.name }} may refund some portion of the Purchase Amount to Buyer under the terms set forth regarding Dissolution Events in Section 3 of this agreement. 
                        li Buyer agrees to execute and deliver to {{ asset.name }} all transaction documents related to the Initial Token Sale. 
                        li All deliveries of Tokens shall be made directly to the crypto-wallet designated by Buyer. 
                        li If Buyer purchases its Pre-Sale Right using a third party processer, that payment processer is Buyer’s agent, not {{ asset.name }}’s, for the purpose of payment and purchase. {{ asset.name }} is not responsible for any loss of funds due to the use of a third party processer. 
                    li
                      strong Termination and Dissolution. 
                      p
                        strong a. 
                        span If there is a Dissolution Event of {{ asset.name }} before this agreement expires or terminates, {{ asset.name }} shall pay Buyer an amount equal to the Purchase Amount, due and payable to Buyer immediately prior to, or concurrent with the Dissolution Event. The Purchase Amount will be paid prior and in preference to any distribution of assets of {{ asset.name }} to equity holders in {{ asset.name }}. If immediately prior to the consummation of a Dissolution Event, the assets of {{ asset.name }} legally available for distribution to Buyer and all other holders of Pre- Sale Rights (the “Pre-Sale Right Holders”), as determined in good faith by {{ asset.name }}’s board of directors, are insufficient to permit payment to the Pre-Sale 
                      p
                        span Right Holders of their respective Purchase Amounts, then the entire assets of {{ asset.name }} legally available for distribution will be distributed with equal priority and pro rata among the Pre-Sale Right Holders in proportion to the Purchase Amounts they would otherwise be entitled to receive under this Section 3(a). 
                      p
                        strong b.
                        span This agreement will expire and terminate (without relieving {{ asset.name }} of any obligations arising from a prior breach of or non-compliance with this agreement) upon either: 
                        ul
                          li The issuance of Tokens to Buyer pursuant to Section 2(c), or
                          li The payment, or setting aside for payment, of amounts due to Buyer pursuant to Section 3(a).
                    li 
                      strong 
                        span {{ asset.name }} 
                        span Representations. 

                      ul
                        li
                          string {{ asset.name }} 
                          span is a Decentralised Autonomus Organisation.
                        li The execution, delivery and performance by {{ asset.name }} of this agreement is within its power and has been duly authorized by all necessary actions of {{ asset.name }}. This agreement constitutes a valid, legal and binding obligation of {{ asset.name }}, enforceable against it in accordance with its terms, except as limited by bankruptcy, insolvency, or other laws of general application to or affecting the enforcement of creditors’ rights generally and general principles of equity.
                        li To the knowledge of the officers of {{ asset.name }}, the company is not in violation of (i) its current articles of incorporation, (ii) any material statute, rule or regulation applicable to it, or (iii) any material indenture or contract to which {{ asset.name }} is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on {{ asset.name }}.
                        li The performance and consummation of the transactions contemplated by this agreement do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to {{ asset.name }}, (ii) result in the acceleration of any material indenture or contract to which {{ asset.name }} is a party or by which it is bound, or (iv) result in the creation or imposition of any lien upon any property, asset, or revenue of {{ asset.name }} or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to {{ asset.name }}, its business or operations. 
                        li No consents or approvals are required in connection with the performance of this agreement other than, (i) {{ asset.name }}’s corporate approvals, and (ii) any qualifications or filings under applicable law.
                        li To the knowledge of its officers, {{ asset.name }} owns or possesses (or can obtain on commercially reasonably terms) sufficient legal rights to all patents, trademarks, service marks, trade names, copyrights, trade secrets, licenses, information, processes and other intellectual property rights necessary for its business as now conducted and as currently proposed to be conducted, without any conflict with or infringement of the rights of others. 
                    li 
                      strong Buyer Representations and Covenants. 
                      ul
                        li Buyer has full legal capacity, power and authority to execute and deliver this agreement and to perform its obligations hereunder. Buyer is over the age of eighteen. This agreement constitutes a valid and binding obligation of Buyer, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency, or other laws of general application to or affecting the enforcement of creditors’ rights generally and general principles of equity. 
                        li Buyer is purchasing its Pre-Sale Rights for its own personal use and utility and to participate in the {{ asset.name }} network and not for investment or financial purposes. Buyer agrees that its Pre-Sale Rights and the Token are not securities and acknowledges that the Pre-Sale Rights may lose value. 
                        li Buyer has complied with all applicable import, re-import, export, re-export control, anti-money laundering laws, regulations guidance and programs, including the Export Administration Regulations, International Traffic in Arms Regulations, the USA Patriot Act of 2001, the Bank Secrecy Act and country or individual-specific sanctions programs or regulations implemented by the U.S. Office of Foreign Asset Control (“OFAC Regulations”) or similar governmental entities in other countries. Buyer is solely responsible for compliance related to its purchase of Pre-Sale Rights. 
                        li Buyer does not intend to hinder, delay or defraud {{ asset.name }} or any other holders of Pre-Sale Rights or Tokens or engage in any illegal conduct and or unlawful activity in relation to money laundering, receiving the proceeds of drug trafficking or terrorist activities; receiving the proceeds of criminal activities, terrorist activities or trading with such countries as might from time to time be subject to any embargo imposed by the Security Council of the United Nations, or the European Union, or the United States, or in any place of the world. 
                        li Buyer will not assign this agreement (including by operation of law or by merger) or sell, delegate or sublicense of its Pre-Sale Rights under this agreement, without {{ asset.name }} prior written consent. Any such assignment, sale, delegation or sublicense shall be void. 
                    li 
                      strong Taxes; Indemnification. 
                      span Buyer shall pay all applicable taxes and duties, including without limitation any value-added tax 
                      span and sales tax that arise in connection with its purchase of Pre-Sale Rights under this agreement (“Buyer Taxes”). 
                      span Buyer shall provide {{ asset.name }} with any information it reasonably requests to determine whether {{ asset.name }} 
                      span is obligated to collect taxes from Buyer. Buyer will defend, indemnify and holds harmless {{ asset.name }}, 
                      span its officers, its directors, its employees, its representatives and its affiliates from any claims, damages, 
                      span losses, liabilities, penalties, fines, costs and expenses (including reasonable attorneys’ fees) arising 
                      span out of or relating to any third party claim concerning this agreement, including without limitation any claims 
                      span related to Buyer Taxes. 
                    li 
                      strong Security and Data Privacy. 
                      ul
                        li
                          span Buyer will implement reasonable appropriate measures designed to secure any device connected to the email 
                          span address associate with its account, private keys required to access any cryptocurrency account or wallet 
                          span and its username, password, login or other identifying credentials. In the event Buyer is no longer 
                          span in possession of a device connected with its account or not able to provide its login, password or other 
                          span identifying credentials, {{ asset.name }} may, in its sole discretion, an only if it is able, grant access to 
                          span Buyer’s account to any person providing additional credentials to us. {{ asset.name }} reserves the right to 
                          span determine the additional credentials required, which may include a sworn, notarized or apostilled statement of identity. 
                        li
                          span Buyer will provide to {{ asset.name }} upon its request information that it deems necessary to maintain 
                          span compliance with any federal, state, local, domestic or foreign law, regulation or policy. 
                        li {{ asset.name }} may use aggregate statistical information about Buyer’s activity on the {{ asset.name }} platform for marketing or any other purpose. {{ asset.name }} may use Buyer’s internet protocol address to verify Buyer’s purchase of the Pre-Sale Rights and Tokens. However, {{ asset.name }} will not release Buyer’s personal information to any third party without its consent, except as not prohibited by law or as set forth in this agreement or its privacy policy. 
                    li 
                      strong Disclaimers; Limitation of Liability. 
                      ul
                        li THE PRE-SALE RIGHTS, THE TOKENS AND THE {{ asset.name }} ARE PROVIDED “AS IS”. IMPACTPPA AND ITS AFFILIATES MAKE NO REPRESENTATIONS OF ANY KIND, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE REGARDING THE PRE-SALE RIGHTS, THE TOKENS OR THE {{ asset.name }} PLATFORM INCLUDING ANY WARRANTY THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR FREE OR FREE OF HARMFUL COMPONENTS OR THAT ANY CONTENT WILL BE SECURE OR NOT OTHERWISE LOST OR DAMAGED. EXCEPT TO THE EXTENT PROHIBITED BY LAW, {{ asset.name }} AND ITS AFFILIATES DISCLAIM ALL WARRANTIES, INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR QUIET ENJOYMENT, AND ANY WARRANTIES ARISING OUT OF ANY COURSE OF DEALING OR USAGE OF GRADE. {{ asset.name }} DOES NOT AND WILL NOT PROVIDE BUYER WITH ANY SOFTWARE OTHER THAN THE TOKENS. BUYER UNDERSTANDS THAT {{ asset.name }}, BLOCKCHAIN TECHNOLOGY AND PROTOCOL AND TOKENS ARE NEW AND UNTESTED TECHNOLOGY OUTSIDE OR {{ asset.name }}’S CONTROL AND ADVERSE CHANGES IN MARKET FORCES OR TECHNOLOGY WILL EXCUSE OUR PERFORMANCE UNDER THIS AGREEMENT. BUYER ASSUMES ALL RISK OF LOSS RESULTING FROM, CONCERNING OR ASSOCIATED WITH THE RISKS SET FORTH IN EXHIBIT 1 TO THIS AGREEMENT WHICH ARE HEREBY INCORPORATED BY REFERENCE INTO THIS AGREEMENT. TRANSACTIONS USING BLOCKCHAIN TECHNOLOGY, SUCH AS THOSE INVOLVING THE PRE-SALE RIGHTS, ARE AT RISK TO MULTIPLE POTENTIAL FAILURES INCLUDING HIGH NETWORK VOLUME, COMPUTER FAILURE, BLOCKCHAIN FAILURE OF ANY KIND AND USER FAILURE. 
                        li {{ asset.name }} and its affiliates will not be liable to Buyer for any direct, indirect, special, consequential or exemplary damages (including without limitation any damages for loss of profits, goodwill, use or data), even if {{ asset.name }} has been advised of the possibility of such damages. Neither {{ asset.name }} nor its affiliates will be responsible for any compensation, reimbursement or damages arising in connection with: (i) Buyer’s ability to use {{ asset.name }}’s platform, (ii) the cost of procurement of substitute goods or services, (iii) Buyer’s investments, expenditures or commitments in connection with this agreement or its use of the {{ asset.name }} platform, or (iv) any unauthorized access to, alternation of, deletion, destruction, damage or loss or failure to store any data, including without limitation any records, private key or other creditors. In any case, {{ asset.name }}’s and its affiliates aggravate liability under this agreement will be limited in value (in United States dollars at the time of the pre-sale) Buyer paid to it for its pre-sale rights. Buyer waives its right to demand the return of any Purchase Amount paid to {{ asset.name }} in the Pre-sale under any circumstance, including a demand for specific performance. 
                    li
                      strong General Provisions. 
                      ul
                        li If any provision of this agreement shall be unlawful, void or for any reason unenforceable, then that provision shall be deemed severable from this agreement and shall not affect the validity and enforceability of the remaining provisions of this agreement. 
                        li This agreement and all transactions hereunder shall be governed by and construed in accordance with the internal laws of The Residence of founders of {{ asset.name }} without regard to the conflicts of law provisions. The parties consent to venue and jurisdiction of the courts situated in or having jurisdiction over The Residence of founders of {{ asset.name }}. 
                        li Each party agrees that it has not relied on any representation, warranty, or provisions not explicitly stated in this agreement, and that no oral or written statement has been made to either party that in any way tends to waive any of the terms or conditions of this agreement. This agreement constitutes the final written expression of the entire agreement between the parties relating to the subject matter hereof, and it is a complete and exclusive statement of that agreement. 
                        li This agreement may be executed in any number of counterparts with the same effect as if all parties hereto had signed the same document. All counterparts are to be construed together and shall constitute one agreement. This agreement and any signed agreement or instrument entered into in connection with this agreement or contemplated hereby, and any amendments hereto or thereto, to the extent signed and delivered by means of a facsimile machine, electronic mail (including pdf or any electronic signature complying with the U.S. federal ESIGN Act of 2000, e.g., www.docusign.com), or other commercially reasonable transmission method shall be treated in all manner and respects as an original agreement or instrument and shall be considered to have the same binding legal effect as if it were the original signed version thereof delivered in person. At the request of any party hereto or to any such agreement or instrument, each other party hereto or thereto agrees to, and must, re-execute original forms thereof and deliver them to all other parties. No party hereto or to any such agreement or instrument may raise the use of a facsimile machine to deliver a signature or the fact that any signature or agreement or instrument was transmitted or communicated through the use of a facsimile machine as a defense to the formation of a contract, and each such party forever waives any such defense. 
              
                el-button(type='primary' @click='deploy' style="margin: 0 auto;display: block;margin-top: 80px;font-size: 120%;padding: 14px 25px;background-color: #b5ae93;border-color: #b5ae93;") Sign and Deploy
            //- div
              //- div(v-for='slice, index in slices').a-flex.a-m_b_10
              //-   el-col(:span='6').a-flex.a-m_r_20
              //-     span.a-label.a-label_no-wrap not less than &nbsp;
              //-     el-input(v-model.number='slice.min')
              //-       span(slot='suffix') {{leftTicker}}
              //-   ae-flat-pricing(
              //-     :state='initialState' 
              //-     :initialPrice='slice.price' 
              //-     :disableExample='true'
              //-     @result='(price) => setPrice(index, price)')
              //-   el-button(type='danger' icon='el-icon-close' @click='removeSlice(index)').a-flex__item_space-left
              //- div.a-m_b_10
              //-   el-button(type='primary' icon='el-icon-plus' @click='addSlice') Add slice
        el-col(:span='8')
          h3 Asset Setup
          pre {{ asset }}
          el-button(type='text' @click='reset') Reset

      el-button-group(v-if='currentStep < 3')
        el-button(icon='el-icon-arrow-left' :disabled='currentStep === 0' @click='step(-1)') Back
        el-button(type='primary' :disabled='currentStep === 3' @click='step(1)')
          span Next step
          i.el-icon-arrow-right.el-icon-right
</template>

<script>
import ipfs from 'ipfs-api'
import marked from 'marked'
import assetTypes from '~/src/util/assetTypes'
import AeFlatPricing from './components/FlatPricing'
import IdeaFactory from '~/src/js/contracts/ideaFactory.js'
export default {
  name: 'Submit',
  props: ['user'],

  components: {
    AeFlatPricing
  },

  data () {
    return {
      currentStep: 0,
      asset: {
        token: {},
        ico: {},
        name: '',
        description: '',
        type: null,
        audio: null,
        cover: null
      },
      assetState: {
        audioLoading: true,
        coverLoading: true
      },
      assetTypes,
      inMiddleWay: true
    }
  },

  computed: {
    audioUrl () {
      if (this.asset.audio) {
        return `http://localhost:8080/ipfs/${this.asset.audio}`
      }
      return ''
    },
    coverUrl () {
      if (this.asset.cover) {
        return `http://localhost:8080/ipfs/${this.asset.cover}`
      }
      return ''
    },
    icoAmount () {
      return 1e6 * this.asset.ico.capPart / 100
    },
    icoDuration () {
      if (!this.asset.ico.startRaw || !this.asset.ico.endRaw) {
        return 0
      }

      return this.asset.ico.endRaw.getDate() - this.asset.ico.startRaw.getDate()
    },
    disableBack () {
      return false
    },

    disableNext () {
      return false
    },
    compiledDescription () {
      return marked(this.asset.description || '', { sanitize: true })
    }
  },

  methods: {
    step (direction) {
      this.currentStep += direction
    },

    async deploy () {
      // string name, string ticker, bytes32 meta, bytes32 cover
      // this.uploadToIPFS()
      // const ipfsProvider = ipfs({ host: '127.0.0.1', port: '5001', protocol: 'http' })
      const metaHash = await this.IPFS()
      await IdeaFactory.createIdea(this.$store.state, this.asset.token.name, this.asset.token.ticker, metaHash, this.asset.cover)
    },

    async IPFS () {
      return new Promise((resolve, reject) => {
        const ipfsProvider = ipfs({ host: '127.0.0.1', port: '5001', protocol: 'http' })
        ipfsProvider.files.add(Buffer.from(JSON.stringify(this.asset), 'utf8'), (err, res) => {
          if (err) {
            reject(err)
          } else {
            console.log(res)
            resolve(res[0].hash)
          }
        })
      })
    },

    reset () {
      if (this.inMiddleWay) {
        this.$confirm('Are you sure to reset asset? You\'re already spent gas on some transactions')
          .then(this._reset)
          .catch(_ => {})
      } else {
        this.asset = {}
        this.currentStep = 0
      }
    },

    uploaded (prefix, response, file) {
      console.log(response)
    },

    uploadFile (request) {
      return this.uploadToIPFS(request, 'test')
      // return new Promise((resolve, reject) => {
      //   const req = new XMLHttpRequest()
      //   req.onreadystatechange = () => {
      //     if (req.readyState !== XMLHttpRequest.DONE) {
      //       return
      //     }

      //     if (req.status >= 200 && req.status < 300) {
      //       const hash = req.getResponseHeader('Ipfs-Hash')
      //       resolve(hash)
      //     } else {
      //       reject(req)
      //     }
      //   }

      //   req.onerror = (error) => {
      //     reject(error)
      //   }

      //   req.open('PUT', 'http://localhost:8080/ipfs', true)
      //   req.setRequestHeader('content-type', request.file.type)
      //   req.send(request.file)
      // })
    },

    uploadFiletest (event, prefix) {
      event.stopPropagation()
      event.preventDefault()
      const file = event.target.files[0]
      let reader = new window.FileReader()
      reader.onloadend = () => {
        this.uploadToIPFS(reader, prefix).then(r => {
          console.log(r.headers.get('ipfs-hash'))
          console.log(r.headers.keys())
          this.asset[prefix] = r
        })
      }
      reader.readAsArrayBuffer(file)
    },

    async uploadAudio (file) {
      this.$set(this.assetState, 'audioLoading', true)
      const ipfsPath = await this.uploadToIPFS(file, 'audio')
      this.$set(this.asset, 'audio', ipfsPath)
      this.$set(this.assetState, 'audioLoading', false)
    },

    async uploadCover (file) {
      this.$set(this.assetState, 'coverLoading', true)
      const ipfsPath = await this.uploadToIPFS(file, 'cover')
      this.$set(this.asset, 'cover', ipfsPath)
      this.$set(this.assetState, 'coverLoading', false)
    },

    uploadToIPFS (request, prefix) {
      console.log(prefix)
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onloadend = () => {
          const buffer = Buffer.from(reader.result)
          const ipfsProvider = ipfs({ host: '127.0.0.1', port: '5001', protocol: 'http' })
          ipfsProvider.files.add(buffer, (err, res) => {
            if (err) {
              reject(err)
            } else {
              resolve(res[0].hash)
            }
          })
        }
        reader.readAsArrayBuffer(request.file)
      })
    }
  }
}
</script>

<style lang="scss">
  .uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .markdown-output {
    height: 100%;
    overflow: hidden;
  }

  .submit-asset {
    &__description {
      max-height: 65vh;
      overflow: hidden;

      &-output,
      &-textarea,
      &-textarea textarea {
        height: 100%;
        overflow: auto;
      }
    }    
  }

  .audio-uploader {
    .el-upload,
    .el-upload-dragger {
      width: 100%;
    }
  }

  .cover-uploader {
    .el-upload-dragger {
      width: 180px;
      height: 180px;
    }
  }
  
  .cover {
    width: 100%;
    height: 100%;
    object-fit: audio;
  }
</style>
