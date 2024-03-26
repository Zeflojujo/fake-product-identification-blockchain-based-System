// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract QrCode {
    event ManufacturerAdded(address indexed manufacturer);
    event RetailerAdded(string retailer);
    event RetailerRemoved(address indexed retailerAddress);

    event PasswordChanged(address indexed admin);
    event ownershipTransferred(address indexed newAdmin);

    event ItemAdded_M(uint256 indexed id);
    event ItemDetailsUpdated_M(
        uint256 indexed id,
        string itemName,
        string description
    );
    event ItemRecorded_M(uint256 indexed id);

    event qrHashStored(uint indexed timestamp);
    event qrHashDeleted(uint256 _blockId);

    struct Manufacturer {
        address manPublicAddress;
        string fullName;
        string email;
        string brand;
        string licenseUri;
        string country;
        string region;
        string state;
        bool agreement;
        string password;
        bool isVerified;
        bool isRegistered;
        bool isLogin;
    }

    struct Retailer {
        address publicAddress;
        string name;
        string location;
        string email;
        string password;
    }

    struct ItemDetails {
        string itemName;
        string description;
    }

    //@dev create system account structure
    struct SystemOwner {
        address sysOwner;
        bytes32 password; /*audit*/
        bool isLogin;
    }

    address private owner;
    SystemOwner private sysowner;

    uint256 public s_retailerID;

    mapping(address => SystemOwner) private sysOwnerMap;

    mapping(address => Manufacturer) public manufacturerDetails;
    address[] private manufactureAddressArray; // manufacturer address array

    mapping(address => mapping(address => Retailer)) public manufacturerToRetailerDetails;
    mapping(address => Retailer) public retailerDetails;
    address[] private retailerDetailsArray;

    //STORING
    mapping(address => mapping(uint256 => string)) private qrHashMapByManufacturer; // stored by manufacturer when generating hash + id

    uint256[] private manufacturerIDHashArr; //scanned by only manufacturer
    mapping(uint => bool) private storedIDs; //just stored

    //MATCHING
    mapping(string => uint256) public matchHashToId; //used by users when scanning

    mapping(string => bool) public matchedItems; //matched hash to items

    mapping(uint256 => ItemDetails) public itemDetails;

    constructor() {
        owner = msg.sender;
        sysowner = SystemOwner(owner, keccak256(abi.encode(("admin"))), false);
        sysOwnerMap[owner] = sysowner;
    }

    modifier onlySysOwner() {
        require(
            msg.sender == owner,
            "Only system owner can perform this action"
        );
        require(
            msg.sender != address(0),
            "Only system owner can perform this action"
        );
        _;
    }

    modifier onlyManufacturer() {
        require(
            manufacturerDetails[msg.sender].isRegistered,
            "Only manufacturer can add retailer details"
        );
        require(
            msg.sender != address(0),
            "Only manufacturer can perform this action"
        );
        _;
    }

    /*@dev System Owner functions*/
    function loginSysOwner(
        bytes32 _password
    ) external onlySysOwner {
        require(
            sysOwnerMap[msg.sender].password ==
                keccak256(abi.encode(_password)),
            "Invalid password of account address"
        );
        sysOwnerMap[msg.sender].isLogin = true;
    }

    function changePassword(
        bytes32 oldPassword,
        bytes32 _newPassword
    ) external onlySysOwner {
        require(
            sysOwnerMap[msg.sender].password ==
                keccak256(abi.encode(oldPassword)),
            "Invalid old password"
        );
        require(_newPassword.length > 0, "Password should not be empty");
        require(
            sysOwnerMap[msg.sender].password !=
                keccak256(abi.encode(_newPassword)),
            "Invalid new password"
        );
        require(sysOwnerMap[msg.sender].isLogin == true, "Not logged in");

        emit PasswordChanged(msg.sender);
        sysOwnerMap[msg.sender].password = _newPassword;
    }

    function transferOwnership(address _address) external onlySysOwner {
        delete sysOwnerMap[owner];
        emit ownershipTransferred(_address);
        owner = _address;
        sysOwnerMap[owner];
    }

    /**@dev Manufacturer functions*/
    function signUpManufacturer(
        address _manPublicAddress,
        string memory _fullName,
        string memory _email,
        string memory _brand,
        string memory _licenseUri,
        string memory _country,
        string memory _region,
        string memory _state,
        bool _agreement,
        string memory _password
    ) external {
       /* require(msg.sender != owner, "Address shouldn't be system owner");
        require(_manPublicAddress != address(0), "Address not valid");
        require(
            manufacturerDetails[_manPublicAddress].isRegistered,
            "Manufacturer is already registered"
        );
        require(bytes(_fullName).length > 0,"Manufacturer name shouldn't be empty");
        require(bytes(_email).length > 0, "Email address shouldn't be empty");
        require(bytes(_brand).length > 0, "Brand shouldn't be empty");
        require(bytes(_licenseUri).length > 0, "License Uri shouldn't be empty");
        require(bytes(_country).length > 0, "Country shouldn't be empty");
        require(bytes(_region).length > 0, "Region shouldn't be empty");
        require(bytes(_state).length > 0, "State shouldn't be empty");
        require(bytes(_password).length > 0, "Password shouldn't be empty");*/

        emit ManufacturerAdded(msg.sender);
        manufacturerDetails[msg.sender] = Manufacturer(
            _manPublicAddress,
            _fullName,
            _email,
            _brand,
            _licenseUri,
            _country,
            _region,
            _state,
            _agreement,
            _password,
            false,
            true,
            false
        );
        manufactureAddressArray.push(_manPublicAddress);
    }

    function verifyManufacturer(address _manufacturerAddress) public onlySysOwner{
        require(manufacturerDetails[_manufacturerAddress].isRegistered, "manufacturer is not registered");
        require(!manufacturerDetails[_manufacturerAddress].isVerified, "manufacturer is already verified");
        manufacturerDetails[_manufacturerAddress].isVerified = true;
    }

    function manufacturerLogin(address _MNPublicAddress, string memory _password) public {
        require(manufacturerDetails[msg.sender].isRegistered, "Your not registered yet!");
        require(manufacturerDetails[msg.sender].isVerified, "Your not verified as manufacturer yet!");
        // require(!manufacturerDetails[msg.sender].isLogin, "Your Already login");
        require(compareStrings(manufacturerDetails[msg.sender].password, _password), "Invalid address or password");

        manufacturerDetails[_MNPublicAddress].isLogin = true;
    }

    function addRetailer(
        address _publicAddress,
        string memory _name,
        string memory _location,
        string memory _email,
        string memory _password
    ) external onlyManufacturer {
        require(_publicAddress != address(0), "Retailer public address not valid");
        require(bytes(_name).length > 0, "Retailer name cannot be empty");
        require(bytes(_location).length > 0, "Location name cannot be empty");
        require(bytes(_email).length > 0, "Email address cannot be empty");
        require(bytes(_password).length > 0, "Phone number cannot be empty");

        emit RetailerAdded(_name);
        Retailer memory retailer = Retailer(
            _publicAddress,
            _name,
            _location,
            _email,
            _password
        );
        manufacturerToRetailerDetails[msg.sender][_publicAddress] = retailer;
        retailerDetails[_publicAddress] = retailer;
        retailerDetailsArray.push(_publicAddress);
    }

    function removeRetailer(address _retailerAddress) external onlyManufacturer {
        require(
            manufacturerToRetailerDetails[msg.sender][_retailerAddress].publicAddress ==
                _retailerAddress,
            "Retailer not found"
        );
        emit RetailerRemoved(_retailerAddress);
        delete manufacturerToRetailerDetails[msg.sender][_retailerAddress];
        delete retailerDetails[manufacturerToRetailerDetails[msg.sender][_retailerAddress].publicAddress];
    }

    function storeQrHash(string memory _qrHash) external onlyManufacturer{
        require(manufacturerDetails[msg.sender].isVerified, "manufacturer is not verified");
        uint256 timestamp = block.timestamp;
        emit qrHashStored(timestamp);

        qrHashMapByManufacturer[msg.sender][timestamp] = _qrHash;
        manufacturerIDHashArr.push(timestamp);
        storedIDs[timestamp] = true;
    }

    function deleteQrHash(uint _blockId) external {
        // onlyManufacturer
        emit qrHashDeleted(_blockId);
        delete qrHashMapByManufacturer[msg.sender][_blockId];
        delete manufacturerIDHashArr[_blockId];
        delete storedIDs[_blockId];
    }

    /// @dev returns manufacturer address array to the frontend
    function getManufacturerArray()
        external
        view
        returns (address[] memory)
    {
        //onlyManufacturer
        
        return manufactureAddressArray;
    }

    function getManufacturer(address _manPublicAddress)
        public
        view
        returns (
            address manPublicAddress,
            string memory email,
            string memory fullName,
            string memory brand,
            string memory licenseUri,
            string memory country,
            string memory region,
            string memory state,
            bool agreement,
            bool isVerified 
        )       
    {
        //onlyManufacturer
        
        Manufacturer memory manufacturer = manufacturerDetails[_manPublicAddress];
        manPublicAddress = manufacturer.manPublicAddress;
        email = manufacturer.email;
        fullName = manufacturer.fullName;
        brand = manufacturer.brand;
        licenseUri = manufacturer.licenseUri;
        country = manufacturer.country;
        region = manufacturer.region;
        state = manufacturer.state;
        agreement = manufacturer.agreement;
        isVerified = manufacturer.isVerified;

    }

    /// @dev returns qrcodeHash array to the manufacturer frontend
    function getManfItemIDList()
        external
        view
        returns (uint256[] memory)
    {
        //onlyManufacturer
        
        return manufacturerIDHashArr;
    }

    /// @dev !! views qrcodeHash and ID one by one. Used when manf wants to match stored ids & hashes to every item
    function getQrHashAndID(address _manPublicAddress, uint256 _blockId)
        public
        view
        returns (string memory qrHash, uint256 blockId)
    {
        //onlyManufacturer
        
        qrHash = qrHashMapByManufacturer[_manPublicAddress][_blockId];
        blockId = _blockId;

    }

    /*@dev matches the stored hashes to each item & returns a bool for evidence */
    function addItemDetails(
        string memory _qrHash,
        uint256 _blockId,
        string memory _itemName,
        string memory _description
    ) external onlyManufacturer{
        require(compareStrings(qrHashMapByManufacturer[msg.sender][_blockId],_qrHash),"Hash isn't stored");
        require(matchedItems[_qrHash] = true, "ID is already matched");
        require(storedIDs[_blockId] == true, "ID isn't stored");
        require(bytes(_itemName).length > 0, "Item name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        emit ItemAdded_M(_blockId);
        emit ItemDetailsUpdated_M(_blockId, _itemName, _description);
        emit ItemRecorded_M(_blockId);

        matchHashToId[_qrHash] = _blockId; //update by matching
        matchedItems[_qrHash] = true;

        itemDetails[_blockId] = ItemDetails(_itemName, _description);
    }

    function scanItem(string memory _qrHash) external view returns (bool) {
        if (matchedItems[_qrHash]) {
            return true;
        } else {
            return false;
        }
    }

    function moreDetailsForScannedItem(
        string memory _qrHash
    ) external view returns (ItemDetails memory) {
        uint id = matchHashToId[_qrHash];
        return itemDetails[id];
    }

    // Cannot directly compare strings in Solidity
    // This function hashes the 2 strings and then compares the 2 hashes
    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}