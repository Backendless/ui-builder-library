define(() => {
    
  function initLibrary(options) {
    if (!options.separator) {
      options.separator = 'of';
    }
    
    const styleTag = !document.getElementById("photoswipeStyle");
    const scriptTag = !document.getElementById("photoswipeScript");
    
    if (styleTag || scriptTag) {
      const script = document.createElement('script');
      script.type = "module";
      script.id = 'photoswipeScript';
      script.innerHTML = `import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js'; 
        const lightbox = new PhotoSwipeLightbox({
          gallery: '#photoSwipeGallery',
          mainClass: 'pswp--custom-icon-colors',
          children: 'a',
          pswpModule: () => import('https://unpkg.com/photoswipe'),
          bgOpacity: ${options.bgOpacity},
          indexIndicatorSep: ' ${options.separator} ',
          allowPanToNext: ${options.allowPanToNext},
          loop: ${options.loop},
          wheelToZoom: ${options.wheelToZoom},
          pinchToClose: ${options.pinchToClose},
          closeOnVerticalDrag: ${options.closeOnVerticalDrag},
          escKey: ${options.escKey},
          arrowKeys: ${options.arrowKeys},
          errorMsg: 'The photo cannot be loaded!'
        }); 
        lightbox.init();`
      document.body.appendChild(script);
      
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.id = 'photoswipeStyle';
      style.href = 'https://unpkg.com/photoswipe/dist/photoswipe.css';
      document.head.appendChild(style);
    }
  } 
  
  function createImages(data, relations) {
    const images = data.map((imgData,idx) => {
      const imageSize = relations.find(el => el.id === imgData.objectId);
      return React.createElement(
        'a', 
        {
          href: imgData.URL,
          'data-pswp-width': 3840,
          'data-pswp-height': 3840 / imageSize.relation,
          key: `photoSwipeGallery-${imgData.objectId}`,
          target: "_blank",
          rel: "noreferrer",
        },
        React.createElement(
          'img', {
          src: imgData.URL,
          alt: "",
          style: {
            width: "15vw",
            height: "auto"
          }
          }
        )
      )
    })
    
    return images;
  }
  
  function updateObjects(data) {
    return data.map(img => {
      const size = {};
      size.id = img.objectId;
      const image = new Image();
      image.src = img.URL;
      size.relation = image.width / image.height;
      return size;
    })
  }
  
  function createGallery(data, show=true) {
    const relations = updateObjects(data);
    const images = createImages(data, relations);
    const display = show? "flex" : "none"
    const gallery = React.createElement(
      'div', 
      {
        className: 'pswp-gallery',
        id: 'photoSwipeGallery',
        style: {display:display, 'flex-wrap': 'wrap'},
      },
      images
    )
    
    return gallery;
  }

  
  return function CustomComponent({component, eventHandlers}) {
    const [galleryComponent, setGalleryComponent] = React.useState(null);
    const elRef = React.useRef(null)
    
    
    
    React.useEffect(() => {
      
      if(component.imagesUrlLogic) {
        const newData = Object.assign({}, component.imagesUrlLogic);
        const imgDataArray = []; 
        
        for(const key in newData) {
          const point = Object.assign({},newData[key]);
          imgDataArray.push(point);
        }
        
        if (component.display) {
          setGalleryComponent(createGallery(imgDataArray));
        } else {
          setGalleryComponent(createGallery(imgDataArray, false));
        }
        
        const options = {
          bgOpacity: Number(component.bgOpacity),
          separator: component.separator,
          allowPanToNext: component.allowPanToNext === 'true',
          loop: component.loop === 'true',
          wheelToZoom: component.wheelToZoom === 'true',
          pinchToClose: component.pinchToClose === 'true',
          closeOnVerticalDrag: component.closeOnVerticalDrag === 'true',
          escKey: component.escKey === 'true',
          arrowKeys: component.arrowKeys === 'true',
        }
        
        initLibrary(options);
        
      }
      
    },[component.imagesUrlLogic, component.imagesUrlLogic?.length, component.display]);
    
    return React.createElement('div', {className: "bl-customComponent-photoGallery", ref: elRef}, galleryComponent);
  }
});
