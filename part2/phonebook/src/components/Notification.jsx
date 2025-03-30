const Notification = ({ errorMessage, successMessage }) => {
    
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
           
    if (errorMessage === null && successMessage === null) {
      return null
    }
    
    if (errorMessage !== null) {
        return(
         <div style={errorStyle}>
          {errorMessage}
         </div>
        )
    }

    if (successMessage !== null) {
        return(
         <div style={successStyle}>
          {successMessage}
         </div>
        )
    }

  }

  export default Notification