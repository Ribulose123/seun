# Setup Instructions

## Audio File ✅
The audio file is correctly located at:
- `public/audio/Olivia_Dean_-_So_Easy_To_Fall_In_Love_(mp3.pm).mp3.mpeg`

The audio player is now configured to use this file.

## Images Needed 📸
You need to add your images to the `public/moments/` folder with these exact names:

1. `mirror-selfie.jpg` - Mirror selfie photo
2. `selfie-together.jpg` - Selfie together photo  
3. `mask-moment.jpg` - Mask moment photo
4. `outdoor-selfie.jpg` - Outdoor selfie photo
5. `close-moment.jpg` - Close moment photo

## How to Add Images

1. Copy your image files
2. Rename them to match the names above (or update the code in `src/components/slides/MomentsPlaylist.tsx`)
3. Place them in: `public/moments/`

## Supported Image Formats
- .jpg
- .jpeg
- .png
- .gif

## Testing
After adding images:
1. Restart your dev server: `npm run dev`
2. The images should appear in the MomentsPlaylist section
3. The audio should play when you click the play button

