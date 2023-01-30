const getSiteData = () => {
  const assetList = document.querySelectorAll('.add-site-img');
  const assetArr = [...assetList];
  return [...new Set(assetArr
    .map(element => element.getAttribute('data-section')))]
    .map(name => ({
      allHiResAssetsLoaded: false,
      allInitialAssetsLoaded: false,
      assets: assetArr
        .filter(asset => asset.getAttribute('data-section') === name)
        .map(element => ({
          element,
          isLoaded: false,
        })),
      hiResAsssets: [],
      name,
    }))
    .concat({
      allHiResAssetsLoaded: false,
      allInitialAssetsLoaded: false,
      assets: [],
      hiResAsssets: [],
      name: 'about',
    });
};

const updateSiteData = (options) => {
  const {
    data,
    isActive,
    section,
  } = options;
  return data.map(item => ({
    ...item,
    isActive: item.name === section ? isActive : false,
  }));
};

const getActiveSectionName = data => (
  data.find(item => item.isActive)
);

export {
  getActiveSectionName,
  getSiteData,
  updateSiteData,
};
