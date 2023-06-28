import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

const App = () => {
  const [state, setState] = useState({
    status: apiStatus.initial,
    data: [],
  })

  useEffect(() => {
    setState(prevState => ({...prevState, status: apiStatus.loading}))
    const getData = async () => {
      const api = 'https://apis.ccbp.in/tg/packages'
      const options = {
        method: 'GET',
      }

      const response = await fetch(api, options)
      if (response.ok) {
        const data = await response.json()
        // console.log(data)
        const updatedData = data.packages.map(each => ({
          id: each,
          name: each.name,
          description: each.description,
          imageUrl: each.image_url,
        }))

        setState({
          data: updatedData,
          status: apiStatus.success,
        })
      }
    }

    getData()
  }, [])

  const loader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const successPage = () => (
    <ul className="list-container">
      {state.data.map(each => {
        const {id, name, description, imageUrl} = each

        return (
          <li key={id} className="list">
            <img src={imageUrl} alt={name} />
            <h1 className="heading">{name}</h1>
            <p className="description">{description}</p>
          </li>
        )
      })}
    </ul>
  )

  const packagesStatus = () => {
    switch (state.status) {
      case apiStatus.loading:
        return loader()
      case apiStatus.success:
        return successPage()
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <h1 className="main-heading">Travel Guide</h1>
      {packagesStatus()}
    </div>
  )
}

export default App
