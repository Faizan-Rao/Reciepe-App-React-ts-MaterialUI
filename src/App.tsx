import { Container, TextField, Button, Stack, } from '@mui/material'
import { useState } from 'react'


import './App.css'

function App() {
  // Type Definitions
  type FormField = React.ChangeEvent<HTMLInputElement>;

  // Dynamic Variables
  const [Reciepe, setReciepe] = useState<string>("")
  const [Detail, setDetail] = useState<object[]>([])

  // Handle field Changes
  const handleChange = (e: FormField) => { setReciepe(e.target.value); console.log(Reciepe) }

  // Handle Reciepe Fetch
  const handleFetch = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${Reciepe}`

    const response = await fetch(url);
    const result = await response.json();

    setDetail(result)


  }

  return (
    // Main Container
    <Container maxWidth={'lg'} className='container'>
      <h1 className='logo'>Reciepe-App</h1>
      {/* Form Grid */}

      <TextField id="filled-basic" onChange={handleChange} label="Reciepe" fullWidth placeholder='Enter Reciepe' variant="standard" />

      <Button style={{ 'margin': "24px 0px" }} variant="contained" onClick={handleFetch}>Find Reciepe</Button>


     <>
        <h1 className='heading'>Your Reciepe {Detail.meals?.length}</h1>

        {
          Detail && Detail.meals?.map(e => {
            return (
              <Stack direction={'row'} display={'flex'} flexWrap={'wrap'} marginY={4}>
                <img src={`${e.strMealThumb}`} alt="meal" height={500} width={500} style={{ 'borderRadius': '25px' }} />
                <div className='content'>
                  <h1 className='main-title' >{e.strMeal}</h1>
                  <h3 className='sub-title'>{e.strCategory} | {e.strArea}</h3>
                  <h4 className='sub-heading'>Instructions</h4>
                  <p className='paragraph'>{e.strInstructions}</p>
                  <h4 className='sub-heading'>Ingredients</h4>
                  <ul className='list'>
                    {
                      Object.keys(e).map(key => {
                        return (<>
                          {
                            key.includes('strIngredient') && e[key] !== "" &&
                            <li className='list_item'>{e[key]}</li>
                          }
                        </>)
                      })
                    }
                  </ul>
                  <h4 className='sub-heading'>Measures</h4>
                  <ul className='list'>
                    {
                      Object.keys(e).map(key => {
                        return (<>
                          {
                            key.includes('strMeasure') && e[key] !== "" &&
                            <li className='list_item'>{e[key]}</li>
                          }
                        </>)
                      })
                    }
                  </ul>
                </div>
              </Stack>
            )
          })
        }

        {/* <Card/> */}
      </>


    </Container>
  )
}

export default App
