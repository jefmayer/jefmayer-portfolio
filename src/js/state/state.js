let siteData = [];

const getSiteData = () => (
  siteData
);

const createSiteData = () => {
  const assetList = document.querySelectorAll('.add-site-img');
  const assetArr = [...assetList];
  siteData = {
    isLoadComplete: false,
    sections: [...new Set(assetArr
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
      }),
    selectedSection: '',
    scrollDirection: null,
  };
};

const updateSiteData = (options) => {
  Object.entries(options).forEach((arr) => {
    const [prop, value] = arr;
    siteData[prop] = value;
  });
  // console.log(siteData);
};

const updateSectionData = (options) => {
  const { name } = options;
  // Updates only selected section data
  const section = siteData.sections.find(s => s.name === name);
  if (section) {
    Object.entries(options).forEach((arr) => {
      const [prop, value] = arr;
      section[prop] = value;
    });
    // console.log(siteData);
  }
};

const getSectionByName = name => (
  siteData.sections.find(section => section.name === name)
);

const getActiveSectionName = () => (
  siteData.sections.find(section => section.isActive)
);

export {
  createSiteData,
  getActiveSectionName,
  getSectionByName,
  getSiteData,
  updateSectionData,
  updateSiteData,
};
