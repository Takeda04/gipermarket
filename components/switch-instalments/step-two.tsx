import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'redux-state/hook';
import React from 'react';
import { Upload1, Upload2, Upload3 } from './style';
import { Button } from 'components/button';
import { UploadFile } from './components';

interface Props {
  setStepActive: React.Dispatch<React.SetStateAction<number>>;
}

const StepTwo: React.FC<Props> = ({ setStepActive }) => {
  const [stepCount, setStepCount] = React.useState(0);
  const { buyerId ,step} = useAppSelector((state) => state.paymart);
  const [loder, setLoder] = React.useState(false);
  const [files, setfiles] = React.useState<{ name: string, file: File }[]>([])
  const formData = new FormData()

  const addMedias = (name: string, file: File) => {
    setfiles((state) => [...state, { name, file }])
  }
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formData.append("buyer_id", buyerId ? buyerId : "");
    files.forEach((item) => {
      formData.append(item.name, item.file);
    })

    fetch("https://api.gipermart.uz/paymart/add-passport/", {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        
        if (result.status === "success") {
          setStepActive(5)
          setLoder(false)
        }
        if(result.data.status === 12){
          setStepActive(5)
          setLoder(false)
        }
      })
      .catch(error => {
        console.log('error', error)
      });

  }

  return (
    <form onSubmit={submit}>

      <Typography mb='24px' variant='h2'>Подтвердите личность</Typography>

      {/* IMg upload */}
      <UploadFile onChange={(file) => { addMedias('passport_first_page', file); setStepCount(stepCount + 1) }}>
        {({ isLoading, handleClick, preview }) => (<Box mb='32px'>
          <Stack alignItems='center' gap="24px">
            <Upload1 >
              {preview && (
                <img
                  style={{ objectFit: 'contain' }}
                  width='100%'
                  height='100%'
                  src={preview}
                  alt="profile_photo"
                />
              )}
            </Upload1>
            <Stack flexGrow={2} >
              <Typography mb='12px' maxWidth='362px' variant='subtitle2'>Фото паспорта с первой страницы</Typography>
            </Stack>
            <Stack maxWidth='158px' flexGrow={1}>
              <Button type='button' sx={{ color: '#000', maxWidth: '158px', border: '1px solid #e5e5e5' }} variant='text' {...(!isLoading && { onClick: handleClick })}>Прикрепить</Button>
            </Stack>
          </Stack>
        </Box>)}
      </UploadFile>
      {/* IMg upload */}
      <UploadFile onChange={(file) => { addMedias('passport_selfie', file); setStepCount(stepCount + 1) }}>
        {({ isLoading, handleClick, preview }) => (<Box mb='32px'>
          <Stack alignItems='center' gap="24px">
            <Upload2>
              {preview && (
                <img
                  style={{ objectFit: 'contain' }}
                  width='100%'
                  height='100%'
                  src={preview}
                  alt="profile_photo"
                />
              )}
            </Upload2>
            <Stack flexGrow={2} >
              <Typography mb='12px' maxWidth='362px' textAlign={{ lg: 'start', md: 'start', xs: "center" }} variant='subtitle2'>Загрузите фото лица на фоне паспорта</Typography>
            </Stack>
            <Stack maxWidth='158px' flexGrow={1}>
              <Button type='button' sx={{ color: '#000', maxWidth: '158px', border: '1px solid #e5e5e5' }} variant='text' {...(!isLoading && { onClick: handleClick })}>Прикрепить</Button>
            </Stack>
          </Stack>
        </Box>)}
      </UploadFile>
      {/* IMg upload */}
      <UploadFile onChange={(file) => { addMedias('passport_with_address', file); setStepCount(stepCount + 1) }}>
        {({ isLoading, handleClick, preview }) => (<Box >
          <Stack alignItems='center' gap="24px">
            <Upload3>
              {preview && (
                <img
                  style={{ objectFit: 'contain' }}
                  width='100%'
                  height='100%'
                  src={preview}
                  alt="profile_photo"
                />
              )}
            </Upload3>
            <Stack flexGrow={2} >
              <Typography mb='12px' maxWidth='362px' variant='subtitle2'>Загрузите фото прописки с паспорта</Typography>
            </Stack>
            <Stack maxWidth='158px' flexGrow={1}>
              <Button type='button' sx={{ color: '#000', maxWidth: '158px', border: '1px solid #e5e5e5' }} variant='text' {...(!isLoading && { onClick: handleClick })}>Прикрепить</Button>
            </Stack>
          </Stack>
        </Box>)}
      </UploadFile>


      <Button loading={loder} onClick={() => setLoder(true)} sx={{ mt: '30px' }} disabled={stepCount == 3 ? false : true} type='submit' fullWidth variant='contained'>Далее</Button>

    </form>

  )
}

export default StepTwo