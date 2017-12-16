const Auth = artifacts.require("./Auth.sol")
const IdeaFactory = artifacts.require("./IdeaFactory.sol")

module.exports = function(deployer) {
  deployer.deploy(Auth)
  deployer.deploy(IdeaFactory)
}
