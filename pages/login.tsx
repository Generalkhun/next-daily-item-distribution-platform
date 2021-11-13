import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { get } from 'http'
import { isEmpty } from 'lodash'
import React, { useReducer } from 'react'

interface Props {

}

const useStyles = makeStyles({
    loginBox: {
        width: '50%',
        height: '50%',
        marginTop: 100,
        marginLeft: 100
    },
    loginWrapper: {
        marginLeft: 30,
        paddingTop: 30,
        paddingBottom: 30,
        marginBottom: 10,
    },
    loginTextField: {
        marginTop: 20,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    loginButton: {
        marginTop:40
    }

})
const login = (props: Props) => {
    const classes = useStyles()
    const [inputUserName, setInputUserName] = React.useState<string>('');
    const [inputPassword, setInputPassword] = React.useState<string>('');
    const [isValidated, setIsValidated] = React.useState<boolean>(false)

    const onChangeUserName = (e: any) => {
        setInputUserName(e.target.value)
    }
    const onChangePassword = (e: any) => {
        setInputPassword(e.target.value)
    }

    return (
        <div>

            <Paper className={classes.loginBox} elevation={2}>
                <Grid container className={classes.loginWrapper}>
                    <Typography variant='h6'>ส่งของเข้าบ้าน admin</Typography>
                    <Grid item xs={12}>
                        <TextField
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
                            className={classes.loginTextField}
                            variant='outlined'
                            error={isValidated && (isEmpty(inputPassword))}
                            placeholder=''
                            label="password"
                            defaultValue=""
                            value={inputPassword}
                            helperText={isValidated && isEmpty(inputPassword) ? "กรุณาใส่ username" : ""}
                            onChange={onChangePassword}
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button  className={classes.loginButton}>เข้าสู่ระบบ</Button>
                    </Grid>
                </Grid>


            </Paper>
        </div>
    )
}

export default login
