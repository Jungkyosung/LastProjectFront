import { Button, TextField, Autocomplete } from "@mui/material";
import Frame from "../main/Frame";


const Regist = () => {
    const name = '';
    const email = '';

    const country = '';
    const nickName = '';

    const handlerSubmit = ()=>{
        
    }

    return (
        <Frame>
            <h2>회원가입</h2>
            <div>
                <span>LOGO</span>
            </div>
            <div>
                <form onSubmit={handlerSubmit}>
                    <TextField label={'Name'} variant="standard" />
                    <TextField label={'NickName'} variant="standard" />
                    <TextField label={'Email'} variant="standard" />
                    <TextField label={'Password'} variant="standard" />
                    <TextField label={'Password Confirm'} variant="standard" />
                    <Autocomplete
                        disablePortal
                        options={nations}
                        sx={{ width: 380 }}
                        renderInput={(params) => <TextField {...params} label='Country' />} />
                    <Button type="submit" variant="contained">REGIST</Button>
                </form>
            </div>
            <div>
                <span>계정이 없으신가요?</span>
                <span>회원가입하기</span>
            </div>
            <div>
                <span>SNS 계정으로 로그인하기</span>
            </div>

        </Frame>
    )
}

export default Regist;

const nations = [
    "korea"
]