import { useDropzone } from 'react-dropzone';
export default function FileUpload({ children }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  return (
    <div className="upload-images-box">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {children}
      </div>
    </div>
  );
}

FileUpload.propTypes = {};
