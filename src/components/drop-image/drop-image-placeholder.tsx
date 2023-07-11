// eslint-disable-next-line react/prop-types
export function DropImagePlaceholder ({ imageUrl }) {
  return (
    <>
      {imageUrl != null && <img src={imageUrl} />}
      {imageUrl == null &&
        <>
          <img src='/drop-image.svg' className='w-40' />
          <span>Drag & Drop your image here</span>
        </>}
    </>
  )
}
