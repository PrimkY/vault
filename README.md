## post to 'localhost:3010/image'
+ use Body with key=image and value=file
+ returns string of directory name that includes three sizes of image (250/700/1000)
+ u can get them by GET method to 'localhost:3010/name/`${size}`.extension'

## post to 'localhost:3010/video'
+ use Body with key=file and value=file
+ returns name of new video file that has been downscaled to HD format
+ u can get download them by GET method to 'localhost:3010/video/`${name}`.extension'
