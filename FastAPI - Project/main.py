from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import aiohttp

app = FastAPI()
app.mount("/static", StaticFiles(directory="public"), name="static")


@app.get('/api/photos')
async def get_photos():
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get('https://jsonplaceholder.typicode.com/photos') as response:
                photos = await response.json()
                return photos
    except Exception as e:
        print('Error retrieving data:', e)
        return {'error': 'Failed to retrieve data'}


@app.get('/')
def get_home():
    return app.send_file('public/index.html')


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=3000)
