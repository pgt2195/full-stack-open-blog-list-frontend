const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const baseStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 500
  }

  const style = type === 'bad'
    ? {...baseStyle, color: 'red'}
    : {...baseStyle, color: 'green'}

  // dangerouslySetInnerHTML permet au message d'être interprété comme du html et non du texte.
  // ne pas utiliser cette technique avec tu contenu qui est écrit par l'utilisateur.
  return (
    <div style={style} className={type === 'bad' ? 'error' : 'notification'}
         dangerouslySetInnerHTML={{ __html: message }}>
    </div>
  )
}

export default Notification