let siteData = [];

const getSiteData = () => (
  siteData
);

const createSiteData = () => {
  const assetList = document.querySelectorAll('.add-site-img');
  const assetArr = [...assetList];
  siteData = [...new Set(assetArr
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
    isActive,
    section,
  } = options;
  siteData = siteData.map(item => ({
    ...item,
    isActive: item.name === section ? isActive : false,
  }));
};

const getActiveSectionName = () => (
  siteData.find(item => item.isActive)
);

export {
  createSiteData,
  getActiveSectionName,
  getSiteData,
  updateSiteData,
};
