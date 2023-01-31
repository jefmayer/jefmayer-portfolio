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
      isActive: false,
      name,
    }))
    .concat({
      allHiResAssetsLoaded: false,
      allInitialAssetsLoaded: false,
      assets: [],
      hiResAsssets: [],
      isActive: false,
      name: 'about',
    });
};

const updateSiteData = (options) => {
  const {
    allHiResAssetsLoaded,
    allInitialAssetsLoaded,
    hiResAsssets,
    isActive,
    name,
  } = options;
  siteData.forEach((section) => {
    if (section.name === name) {
      section.allHiResAssetsLoaded = allHiResAssetsLoaded !== undefined ? allHiResAssetsLoaded : section.allHiResAssetsLoaded;
      section.allInitialAssetsLoaded = allInitialAssetsLoaded !== undefined ? allInitialAssetsLoaded : section.allInitialAssetsLoaded;
      section.hiResAsssets = hiResAsssets !== undefined ? hiResAsssets : section.hiResAsssets;
      section.isActive = isActive !== undefined ? isActive : section.isActive;
    }
  });
  console.log(siteData);
};

const getSectionByName = name => (
  siteData.find(section => section.name === name)
);

const getActiveSectionName = () => (
  siteData.find(section => section.isActive)
);

export {
  createSiteData,
  getActiveSectionName,
  getSectionByName,
  getSiteData,
  updateSiteData,
};
