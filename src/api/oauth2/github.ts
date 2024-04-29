import axios from 'axios'

export const getGhCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const authURL = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GHID}&redirect_uri=${import.meta.env.VITE_REDIRECTURI}&scope=user`
    const popup = window.open(authURL, 'GitHub OAuth Login', 'width=600,height=600')

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      reject('Por favor, habilita las ventanas emergentes para continuar.')
    }

    // Escuchar los cambios en la URL de la ventana emergente
    const interval = setInterval(() => {
      try {
        if (popup) {
          if (popup.location.href.indexOf(import.meta.env.VITE_REDIRECTURI) !== -1) {
            clearInterval(interval)
            const urlParams = new URLSearchParams(popup.location.search)
            const code = urlParams.get('code')
            if (code) {
              popup.close()
              resolve(code)
            } else {
              reject('No se pudo obtener el código de autorización.')
            }
          }
        }
      } catch (error) {
        console.log('Esperando por el código...')
      }
    }, 1000)
  })
}

export const getGhToken = async (code: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
      {
        client_id: import.meta.env.VITE_GHID,
        client_secret: import.meta.env.VITE_GHSECRET,
        code: code,
        redirect_uri: import.meta.env.VITE_REDIRECTURI
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const responseData = new URLSearchParams(response.data)
    const accessToken = responseData.get('access_token')

    if (!accessToken) {
      throw new Error('No se pudo obtener el token de acceso.')
    }

    return accessToken
  } catch (error) {
    console.error('Error al intercambiar el código por un token:', error)
    throw new Error('No se pudo obtener el token de acceso.')
  }
}

export const getGithubUser = async (accessToken: string): Promise<any> => {
  try {
    const response = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
    throw new Error('No se pudo obtener los datos del usuario.')
  }
}
