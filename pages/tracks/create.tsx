import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import { useInput } from '../../hooks/useInput';
import FileUpload from '../../components/FileUpload';
import axios from 'axios';

const Create = () => {
	const [activeStep, setActiveStep] = useState(0)
	const [picture, setPicture] = useState('')
	const [audio, setAudio] = useState('')
	const name = useInput('')
	const artist = useInput('')
	const text = useInput('')
	const router = useRouter()

	const next = () => {
		if (activeStep !== 2) {
			setActiveStep(prev => prev + 1)
		} else {
			const formData = new FormData()
			
			formData.append('name', name.value)
			formData.append('text', text.value)
			formData.append('artist', artist.value)
			formData.append('picture', picture)
			formData.append('audio', audio)
			axios.post('http://localhost:5000/tracks', formData)
				.then(resp => router.push('/tracks'))
				.catch(e => console.log(e))
		}
	}

	const back = () => {
		setActiveStep(prev => prev - 1);
	}

	return (
		<MainLayout>
			<StepWrapper activeStep={activeStep}>
				{activeStep === 0 &&
				<Grid container direction={"column"} style={{padding: 20}}>
					<TextField
						{...name}
						style={{marginTop: 10}}
						label={"Название трека"}
					/>
					<TextField
						{...artist}
						style={{marginTop: 10}}
						label={"Имя исполнителя"}
					/>
					<TextField
						{...text}
						style={{marginTop: 10}}
						label={"Слова к треку"}
						multiline
						rows={3}
					/>
				</Grid>
				}
				{activeStep === 1 &&
				<FileUpload setFile={setPicture} accept="image/*">
					<div className="file-uload-cont">
						<Button>Загрузить изображение</Button>
					</div>
				</FileUpload>
				}
				{activeStep === 2 &&
				<FileUpload setFile={setAudio} accept="audio/*">
					<div className="file-uload-cont">
						<Button>Загрузить аудио</Button>
					</div>
				</FileUpload>
				}
			</StepWrapper>
			<Grid container justifyContent='space-between'>
				<Button variant="contained" disabled={activeStep === 0} onClick={back}>Назад</Button>
				<Button variant="contained" onClick={next}>Далее</Button>
			</Grid>
		</MainLayout>
	);
};

export default Create;