import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActivateNewAccount() {
    const {email} = useParams();
    const {activationCode} = useParams();
    const [isActivated, setIsActivated] = useState(false);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        console.log("Email:", email);
        console.log("Mã kích hoạt:", activationCode);

        if (email && activationCode) {
            handleActivation();
        }
    }, []);

    const handleActivation = async () => {
        try {
            const url = `http://localhost:8080/account/activate?email=${email}&activationCode=${activationCode}`;
            const response = await fetch(url, { method: "GET" });

            if (response.ok) {
                setIsActivated(true);
            } else {
                setNotification(response.text+ "");
            }
        } catch (error) {
            console.log("Lỗi khi kích hoạt", error);
        }
    }
    return (
        <div>
            <h1>Kích hoạt tài khoản</h1>
            {
                isActivated 
                ? (<p>Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục sử dụng dịch vụ!</p>)
                : (<p>{notification}</p>)
            }
        </div>
    );
}

export default ActivateNewAccount