import React, { createRef, useEffect, useState } from 'react'
import "./CustomInput.css";

const CustomOTPInput = ({ cursorColor = "black", textStyle = {}, fieldWidth = "50px", errorMessage = "Invalid OTP.", errorMessageAlignment = "start", isInValidOtp = false, showUnderline = false, onChanged = () => { }, onCompleted = () => { }, pinLength = 4 }) => {
    const [otp, setOtp] = useState(Array.from({ length: pinLength }, (v, i) => ""));
    const otpInputRefs = [...otp.map((v, i) => createRef())];
    const [isError, setIsError] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleChange = (index, e) => {
        onChanged(e);
        setIsError(true);
        let { value } = e.target;
        if (!isNaN(value)) {
            setOtp(prev => prev.map((item, i) => i === index ? value : item))
        }
    }

    const handleOtpKeyDown = (index, e) => {
        let { value } = e.target;
        if (["Backspace", "Delete"].includes(e?.key)) {
            if (e.key === "Backspace" && index !== 0) {
                if (otp[index - 1] && otp[index + 1] && !!!value) {
                    otpInputRefs[index].current.focus();
                }
                else {
                    otpInputRefs[index - 1].current.focus();
                }
            } else {
                otpInputRefs[index].current.focus();
            }
        } else {
            if (value.toString().trim().length !== 0 && !isNaN(value) && otpInputRefs?.length !== index + 1) {
                otpInputRefs[index + 1].current.focus();
            }
        }
    }

    useEffect(() => {
        let checkValue = otp.every((value) => !!value);
        if (checkValue) {
            setIsError(false);
            onCompleted(otp.join(""));
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
            setIsError(true);
        }
    }, [otp]);

    useEffect(() => {
        setIsError(false);
    }, []);

    return (
        <div className="otp-wrapper">
            <div className='otp-input-wrapper'>
                {otp.map((v, i) => (
                    <div
                        style={{ width: fieldWidth, ...textStyle }}
                        className={` otp-box ${isError || isInValidOtp ? "error" : ""} ${isCompleted ? "success" : ""} ${showUnderline ? "show-underline" : "hide-underline"}`}
                        key={i}
                    >
                        <input
                            style={{ caretColor: cursorColor }}
                            className={`form-input`}
                            type="number"
                            name={`otp-${i}`}
                            id={`otp-${i}`}
                            onInput={(e) => (e.target.value) = e.target.value.slice(-1)}
                            value={otp[i]}
                            onKeyUp={(e) => handleOtpKeyDown(i, e)}
                            onChange={(e) => handleChange(i, e)}
                            ref={otpInputRefs[i]}
                        />
                    </div>
                ))}
            </div>
            {isInValidOtp ?
                <div className="error-message" style={{ textAlign: errorMessageAlignment }}>
                    {errorMessage}
                </div>
                : null}
        </div>

    )
}

export default CustomOTPInput