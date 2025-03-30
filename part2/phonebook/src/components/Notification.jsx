const Notification = ({ notifyMessage }) => {
    
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
           
    if (notifyMessage === null) {
      return null
    }
    
    if (notifyMessage.toLowerCase().includes('error')) {
        return(
         <div style={errorStyle}>
          {notifyMessage}
         </div>
        )
    }

    if (notifyMessage !== null) {
        return(
         <div style={successStyle}>
          {notifyMessage}
         </div>
        )
    }


  }

  export default Notification