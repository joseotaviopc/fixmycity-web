export function ImagePicker() {
    return (
        <div >
            <div >
                <button 
                // { opacity: loadingUpload ? 0.3 : 0.9 }]} 
                // onPress={takePicture} disabled={loadingUpload}
                >
                    <p>📸 Take a photo</p>
                </button>
                <button 
                // { opacity: loadingUpload ? 0.3 : 0.9 }]} onPress={pickImage} disabled={loadingUpload}
                >
                    <p>🏙️ Pick an image</p>
                </button>
            </div>
            {/* <div , { display: "none" }]}>
                <button , { opacity: loadingUpload || !image ? 0.3 : 0.9 }]} onPress={saveImage} disabled={!image || loadingUpload}>
                    <Text }>💾 Save image</Text>
                </button>
            </div> */}
            {/* {uploadProgress !== 0 ? (
                <div , { width: width - 48 }]}>
                    <div , { width: `${uploadProgress}%` }]} />
                </div>
            ) : null}
            {issueImage && <Image source={{ uri: issueImage }} } />} */}
        </div>
    )
}