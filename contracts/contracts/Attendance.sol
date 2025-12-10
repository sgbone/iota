// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Attendance {
    // Cấu trúc một buổi học
    struct Session {
        uint256 id;
        string className;
        uint256 startTime;
        bool isActive;
        address teacher;
    }

    uint256 public nextSessionId;
    
    // Lưu danh sách các buổi học
    mapping(uint256 => Session) public sessions;
    
    // Lưu trạng thái: ID Buổi học -> Địa chỉ sinh viên -> Đã điểm danh chưa?
    mapping(uint256 => mapping(address => bool)) public hasCheckedIn;

    // Sự kiện để Frontend bắt được (Log)
    event SessionCreated(uint256 indexed sessionId, string className, address teacher);
    event CheckedIn(uint256 indexed sessionId, address student, uint256 timestamp);

    // 1. Giáo viên tạo buổi học
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

    // 2. Sinh viên điểm danh
    function checkIn(uint256 _sessionId) external {
        require(_sessionId < nextSessionId, "Session khong ton tai");
        require(sessions[_sessionId].isActive, "Buoi hoc da ket thuc");
        require(!hasCheckedIn[_sessionId][msg.sender], "Ban da diem danh roi");

        hasCheckedIn[_sessionId][msg.sender] = true;
        
        emit CheckedIn(_sessionId, msg.sender, block.timestamp);
    }

    // 3. Đóng buổi học (Teacher only)
    function closeSession(uint256 _sessionId) external {
        require(msg.sender == sessions[_sessionId].teacher, "Chi giao vien moi duoc dong");
        sessions[_sessionId].isActive = false;
    }
}