import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { get } from 'http'
import { isEmpty } from 'lodash'
import React, { useContext, useEffect, useReducer } from 'react'
import InvalidUsernamePasswordModal from '../components/LoginContent/components/InvalidUsernamePasswordModal'
import { LoginContext } from '../contextProviders/LoginContextProvider'
import router from "next/dist/client/router";
interface Props {

}

const useStyles = makeStyles({
    loginContentWrapepr: {
        // display: 'flex',
        // justifyContent: 'center'
    },
    loginBox: {
        width: 400,
        height: '49.5%',
        marginTop: 200,

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
const login = (props: Props) => {
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
            inputUserName === 'admin1234' &&
            inputPassword === 'password1234'
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
            {/* <Typography variant='h6'>ส่งของเข้าบ้าน admin</Typography> */}
            <Grid container className={classes.loginContentWrapepr}>
                <Grid item xs={1} sm={4}></Grid>
                <Grid item xs={8} sm={4}>
                    <Paper className={classes.loginBox} elevation={2}>
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
                                    helperText={isValidated && isEmpty(inputUserName) ? "กรุณาใส่ username" : ""}
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
                                    helperText={isValidated && isEmpty(inputPassword) ? "กรุณาใส่ password" : ""}
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
                        </Grid>


                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={1} sm={4}></Grid>

        </>
    )
}

export default login
