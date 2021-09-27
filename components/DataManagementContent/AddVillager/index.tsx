import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
    
}

const AddVillager = (props: Props) => {
    return (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="required"
            label="ชื่อตัวแทนบ้าน"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="เบอร์ติดต่อ"
            defaultValue=""
          />
        </div>
        
      </Box>
    )
}

export default AddVillager


// "^0([8|9|6])([0-9]{8}$)"
