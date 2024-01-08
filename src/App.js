import React, { } from 'react'
import "./App.css";
import CustomOTPInput from './CustomOTPInput';

const App = () => {
    return (
        <div className='container mt-5'>
            <div className="form-area">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="otp" className='form-label'>OTP: </label>
                        <CustomOTPInput
                            textStyle={{}}
                            fieldWidth={"50px"}
                            pinLength={4}
                            showUnderline={true}
                            errorMessageAlignment="start"
                            isInValidOtp={false}
                            cursorColor="blue"
                            onCompleted={(value) => {
                                console.log(value)
                            }} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default App;