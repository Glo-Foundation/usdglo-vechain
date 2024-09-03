// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "../v1/USDGLO.sol";

contract MockUSDGlobalIncomeCoin is USDGlobalIncomeCoin {
    address mockedOwner;
    bool useMockedOwner;

    function setMockedOwner(address _mockedOwner) external {
        mockedOwner = _mockedOwner;
    }

    function setUseMockedOwner(bool _useMockedOwner) external {
        useMockedOwner = _useMockedOwner;
    }

    function _msgSender() internal view override returns (address) {
        if (useMockedOwner) {
            return mockedOwner;
        }
        return super._msgSender();
    }
}
