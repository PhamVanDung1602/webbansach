import React, { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        const loginRequest = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/account/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            }).then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Đăng nhập thất bại')
                    }
                }
            ).then(
                (data) => {
                    //handle login successful
                    const { jwt } = data;
                    // save token to localStorage or cookie
                    localStorage.setItem('token', jwt);
                    //Navigate to the main page or post-login tasks
                    setError('Đăng nhập thành công!');
                }
            ).catch((error) => {
                //handel login error
                console.error('Đăng nhập thất bại', error);
                setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu');
            }
            );
    }
    return (
        <div className="container">
            <div className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Đăng nhập</h1>
                <label className="sr-only">Tên đăng nhập</label>
                <input type="username"
                    id="username"
                    className="form-control mb-2"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="sr-only">Mật khẩu</label>
                <input type={showPassword ? 'text' : 'password'}
                    id="inputPassword"
                    className="form-control mb-2"
                    placeholder="Mật khẩu" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="checkbox mb-3 d-flex">
                    <label>
                        <input type="checkbox" value="remember-me" /> Ghi nhớ đăng nhập
                    </label>
                </div>
                <div className="checkbox mb-3 d-flex">
                    <input
                        type="checkbox"
                        id="showPassword"
                        name="showPassword"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword"> Hiện mật khẩu </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button"
                    onClick={handleLogin}
                >Đăng nhập</button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
}

export default Login