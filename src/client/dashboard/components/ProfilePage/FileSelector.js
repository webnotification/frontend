
class FileSelector extends React.Component{
    render(){
        return(
                <div>
                    <div>
                        <label>Upload Image</label>
                    </div>
                    <form id="uploadForm"
                          encType="multipart/form-data"
                          action="/dashboard/image/upload"
                          method="post">
                      <input type="file" name="userPhoto"></input>
                      <input type="submit" value="Upload Image" name="submit" ></input>
                      <span id = "status"></span>
                    </form>
                </div>
            );
    }
}

export default FileSelector;
