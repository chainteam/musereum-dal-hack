pragma solidity ^0.4.18;

import './IdeaToken.sol';
import './interfaces/IDAO.sol';
import '../base/Ownable.sol';

contract IdeaDAO is IDAO, Ownable {
  bytes32 public meta;
  bytes32 public cover;

  event UpdateMeta(address indexed changer, bytes32 indexed meta, bytes32 indexed cover);

  function IdeaDAO(address _owner, string _name, string _ticker, bytes32 _meta, bytes32 _cover) public {
    token = new IdeaToken(_owner, address(this), _name, _ticker);

    cover = _cover;
    meta = _meta;
    UpdateMeta(_owner, _meta, _cover);
  }

  function updateMeta(bytes32 _meta, bytes32 _cover) _isOwner public returns (bool) {
    meta = _meta;
    cover = _cover;
    UpdateMeta(msg.sender, _meta, _cover);
  }
}