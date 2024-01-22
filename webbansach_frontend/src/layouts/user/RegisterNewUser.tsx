import React, { useState } from "react";

function RegisterNewUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [notification, setNotification] = useState("");
    const [avatar, setAvatar] = useState<File|null>(null);
    //error message variable
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorRepeatedPassword, setErrorRepeatedPassword] = useState("");

    // Convert file to Base64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    //handle login infomation
    const handleSubmit = async (e: React.FormEvent) => {
        //clear any previous error messages
        setErrorUsername('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorRepeatedPassword('');

        //avoid clicking continuously
        e.preventDefault();

        //check conditión and attach the result to the variable
        const isUserNameValid = !await handleUsernameExisted(username);
        const isEmailValid = !await handleEmailExisted(email);
        const isPasswordValid = !await handleUsernameExisted(password);
        const isRepeatedPasswordValid = !await handleUsernameExisted(repeatedPassword);

        //check all conditions
        if (isUserNameValid && isEmailValid && isPasswordValid && isRepeatedPasswordValid) {

            const base64Avatar = avatar ? await getBase64(avatar) : null;
            console.log("avatar: " + base64Avatar);

            try {
                const url = "http://localhost:8080/account/register";
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        fullName: fullName,
                        phoneNumber: phoneNumber,
                        gender: gender,
                        birthDay: {
                            day: day,
                            month: month,
                            year: year
                        },
                        avatar: base64Avatar
                    }
                    )
                })

                if (response.ok) {
                    setNotification("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
                } else {
                    setNotification("Đã xảy ra lỗi trong quá trình đăng ký tài khoản!");
                }
            } catch (error) {
                setNotification("Đã xảy ra lỗi trong quá trình đăng ký tài khoản!");
            }
        }

    }

    //CHECK USERNAME---------------------------------------------------------------
    const handleUsernameExisted = async (username: string) => {
        //endpoint
        const url = `http://localhost:8080/user/search/existsByUsername?username=${username}`;
        console.log(url);
        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();

            if (data === "true") {
                setErrorUsername("Tên đăng nhập đã tồn tại!");
                return true;
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
            return false;
        }
    }

    const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        //change value
        setUsername(e.target.value);

        //check error
        setErrorUsername('');

        //check the existence
        return handleUsernameExisted(e.target.value);
    }
    //------------------------------------------------------------------------------------------


    //CHECK PASSWORD---------------------------------------------------------------
    const checkPassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
            return true;
        } else {
            setErrorPassword(""); // password is valid
            return false;
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //change value
        setPassword(e.target.value);

        //check error
        setErrorPassword('');

        //check the existence
        return checkPassword(e.target.value);
    }
    //------------------------------------------------------------------------------------------


    //CHECK REPEATED PASSWORD---------------------------------------------------------------
    const checkRepeatedPassword = (repeatedPassword: string) => {
        if (repeatedPassword !== password) {
            setErrorRepeatedPassword("Mật khẩu không trùng khớp");
            return true;
        } else {
            setErrorRepeatedPassword(""); // password matches
            return false;
        }
    }

    const handleRepeatedPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //change value
        setRepeatedPassword(e.target.value);

        //check error
        setErrorRepeatedPassword('');

        //check the existence
        return checkRepeatedPassword(e.target.value);
    }
    //------------------------------------------------------------------------------------------


    //CHECK EMAIL---------------------------------------------------------------
    const handleEmailExisted = async (email: string) => {
        //endpoint
        const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;
        console.log(url);
        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();

            if (data === "true") {
                setErrorEmail("Email đã tồn tại!");
                return true;
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra email:", error);
            return false;
        }
    }

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        //change value
        setEmail(e.target.value);

        //check error
        setErrorEmail('');

        //check the existence
        return handleEmailExisted(e.target.value);
    }
    //------------------------------------------------------------------------------------------

    //HANDLE AVATAR--------------------------------------------------------------------
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const file = e.target.files[0];
            setAvatar(file);
        }
    }
    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký</h1>
            <div className="mb-3 col-mb-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label d-flex"><strong>Tên đăng nhập:</strong></label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <div className="d-flex" style={{ color: "red" }}>{errorUsername}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label d-flex"><strong>Mật khẩu:</strong></label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className="d-flex" style={{ color: "red" }}>{errorPassword}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="repeatedPassword" className="form-label d-flex"><strong>Nhập lại mật khẩu:</strong></label>
                        <input
                            type="password"
                            id="repeatedPassword"
                            className="form-control"
                            value={repeatedPassword}
                            onChange={handleRepeatedPasswordChange}
                        />
                        <div className="d-flex" style={{ color: "red" }}>{errorRepeatedPassword}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label d-flex"><strong>Họ tên:</strong></label>
                        <input
                            type="text"
                            id="fullName"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label d-flex"><strong>Giới tính:</strong></label>
                        <select className="form-select" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label d-flex"><strong>Số điện thoại:</strong></label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label d-flex"><strong>Ngày sinh:</strong></label>
                        <div className="row">
                            <div className="col-4">
                                <select className="form-select" id="day" name="day" onChange={(e) => setDay(e.target.value)}>
                                    <option value="">Ngày</option>
                                    {Array.from({ length: 31 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="form-select" id="month" name="month" onChange={(e) => setMonth(e.target.value)}>
                                    <option value="">Tháng</option>
                                    {Array.from({ length: 12 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="form-select" id="year" name="year" onChange={(e) => setYear(e.target.value)}>
                                    <option value="">Năm</option>
                                    {Array.from({ length: 100 }, (_, index) => {
                                        const year = new Date().getFullYear() - index;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label d-flex"><strong>Email:</strong></label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className="d-flex" style={{ color: "red" }}>{errorEmail}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label d-flex"><strong>Ảnh đại diện:</strong></label>
                        <input
                            type="file"
                            id="avatar"
                            className="form-control"
                            accept="image/"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        <div style={{ color: "blue" }}>{notification}</div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default RegisterNewUser