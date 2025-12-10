// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Attendance {
    struct Session {
        uint256 id;
        string className;
        uint256 startTime;
        bool isActive;
        address teacher;
    }

    uint256 public nextSessionId;
    mapping(uint256 => Session) public sessions;
    // Mapping: sessionId -> studentAddress -> hasCheckedIn
    mapping(uint256 => mapping(address => bool)) public hasCheckedIn;

    event SessionCreated(uint256 indexed sessionId, string className, address teacher);
    event CheckedIn(uint256 indexed sessionId, address student, uint256 timestamp);

    // Tạo buổi học mới (Giáo viên)
    function createSession(string memory _className) external {
        sessions[nextSessionId] = Session({
            id: nextSessionId,
            className: _className,
            startTime: block.timestamp,
            isActive: true,
            teacher: msg.sender
        });
        
        emit SessionCreated(nextSessionId, _className, msg.sender);
        nextSessionId++;
    }

    // Sinh viên điểm danh
    function checkIn(uint256 _sessionId) external {
        require(sessions[_sessionId].isActive, "Buoi hoc khong ton tai hoac da dong");
        require(!hasCheckedIn[_sessionId][msg.sender], "Ban da diem danh roi");

        hasCheckedIn[_sessionId][msg.sender] = true;
        
        emit CheckedIn(_sessionId, msg.sender, block.timestamp);
    }

    // Đóng buổi học (Chỉ giáo viên tạo ra mới được đóng)
    function closeSession(uint256 _sessionId) external {
        require(msg.sender == sessions[_sessionId].teacher, "Chi giao vien moi duoc dong");
        sessions[_sessionId].isActive = false;
    }

    function getSession(uint256 _sessionId) external view returns (Session memory) {
        return sessions[_sessionId];
    }
}