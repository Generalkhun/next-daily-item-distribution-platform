import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { isEmpty } from 'lodash'
import React, { useContext, useEffect } from 'react'
import InvalidUsernamePasswordModal from '../components/LoginContent/components/InvalidUsernamePasswordModal'
import { LoginContext } from '../contextProviders/LoginContextProvider'
import router from "next/dist/client/router";
import { ExtraNavigationBtn } from '../components/common/ExtraNavigationBtn'

const useStyles = makeStyles({
    loginBoxContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    loginBox: {
        width: 400,
    },
    loginWrapper: {
        marginLeft: 10,
        paddingTop: 1,
        paddingBottom: 1,
        marginBottom: 10,
        width: '95%',

    },
    loginTextField: {
        marginTop: 10,
        backgroundColor: '#eeeee4',
        borderRadius: 5,
    },
    loginButton: {
        marginTop: 10,
        backgroundColor: '#f7e1af'
    }

})
const Login = () => {
    const classes = useStyles()
    const [inputUserName, setInputUserName] = React.useState<string>('');
    const [inputPassword, setInputPassword] = React.useState<string>('');
    const [isValidated, setIsValidated] = React.useState<boolean>(false)

    const [isShowInvalidModal, setIsShowInvalidModal] = React.useState<boolean>(false)
    const { loginSuccessHandler, loginSessionChecker } = useContext(LoginContext)

    const onChangeUserName = (e: any) => {
        setInputUserName(e.target.value)
    }
    const onChangePassword = (e: any) => {
        setInputPassword(e.target.value)
    }
    const closeInvalidAuthModalHandler = () => {
        setIsShowInvalidModal(false)
    }
    const openInvalidAuthModalHandler = () => {
        setIsShowInvalidModal(true)
    }
    const onLogin = () => {
        setIsValidated(true)
        if (isEmpty(inputPassword) || isEmpty(inputUserName)) {
            return
        }
        // check if the username and password is correct
        if (
            // mocking auth
            inputUserName === 'a' &&
            inputPassword === 'b'
        ) {
            // auth success
            loginSuccessHandler()
            return
        }
        openInvalidAuthModalHandler()
        return
    }
    useEffect(() => {
        const isAlreadyLogin = loginSessionChecker()
        if (isAlreadyLogin) {
            // navigate to main page if already logged in
            typeof window !== 'undefined' && router.push('/')
        }
    }, [])

    return (
        <>
            {isShowInvalidModal ?
                <InvalidUsernamePasswordModal
                    isOpenModal={isShowInvalidModal}
                    handleCloseModal={closeInvalidAuthModalHandler}
                />
                :
                <></>
            }
            <div className={classes.loginBoxContainer}>
                <Paper className={classes.loginBox} elevation={2}>
                    <Typography style={{ marginLeft: 120 }}>ส่งของเข้าบ้าน ADMIN</Typography>
                    <Grid container className={classes.loginWrapper}>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                className={classes.loginTextField}
                                variant='outlined'
                                error={isValidated && (isEmpty(inputUserName))}
                                placeholder=''
                                label="username"
                                defaultValue=""
                                value={inputUserName}
                                onChange={onChangeUserName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                className={classes.loginTextField}
                                variant='outlined'
                                error={isValidated && (isEmpty(inputPassword))}
                                placeholder=''
                                label="password"
                                defaultValue=""
                                value={inputPassword}
                                onChange={onChangePassword}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                fullWidth
                                variant='contained'
                                className={classes.loginButton}
                                onClick={onLogin}
                            >
                                เข้าสู่ระบบ
                            </Button>
                        </Grid>

                        <p>Hint: use username: a,password:b to login ;)</p>
                    </Grid>
                </Paper>
            </div>

            <ExtraNavigationBtn />
        </>
    )
}

export default Login;
