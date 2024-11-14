  // const handleFileChange = async (e) => {
  //   const selectedFiles = e.target.files;
  //   let compressedFiles = [];

  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     try {
  //       const file = selectedFiles[i];
  //       const options = {
  //         maxSizeMB: 1, // Limit file size to 1MB
  //         maxWidthOrHeight: 1024, // Set max width or height
  //         useWebWorker: true,
  //       };

  //       const compressedFile = await imageCompression(file, options);
  //       compressedFiles.push(compressedFile);
  //     } catch (error) {
  //       console.error('Error compressing file:', error);
  //     }
  //   }

  //   setFiles(compressedFiles);
  // };

  // const handleFileUpload = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append('images', files[i]);
  //   }
  //   formData.append('eventId', id);
  //   try {
  //     const response = await fetch('http://localhost:5000/api/admin/add-gallery-img', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       alert('Images uploaded successfully!');
  //       setIsModalOpen(false);
  //     } else {
  //       alert('Failed to upload images.');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading files:', error);
  //   }
  // };
