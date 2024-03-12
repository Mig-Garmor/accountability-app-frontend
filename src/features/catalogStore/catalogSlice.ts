import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateObject {
  productsSuccessFlag: boolean;
  categoriesSuccessFlag: boolean;
  catalogFilterType: string;
  productId: number;
  categoryId: number;
  showProductsFilter: boolean;
  productsTablePage: number;
  productsTableSize: number;
  totalNumOfProducts: number;
  allProducts: any | undefined;
  categoriesTablePage: number;
  categoriesTableSize: number;
  totalNumOfCategories: number;
  subcategories: Array<any> | undefined;
  individualProductData: any;
  individualCategoryData: any;
  editProduct: boolean;
  editCategory: boolean;
  productNotes: any;
  productNotesSuccessFlag: boolean;
  //Vendors
  vendorId: number;
  individualVendorData: any;
  fileId: number;
  filteredFile: any;
  vendorFilesSuccessFlag: boolean;
  vendorNotesSuccessFlag: boolean;
  vendorsSuccessFlag: boolean;
  vendorsTablePage: number;
  vendorsTableSize: number;
  totalNumOfVendors: number;
}

const initialState: InitialStateObject = {
  productsSuccessFlag: false,
  categoriesSuccessFlag: false,
  catalogFilterType: "Products",
  productId: 0,
  categoryId: 0,
  showProductsFilter: false,
  productsTablePage: 0,
  productsTableSize: 10,
  totalNumOfProducts: 0,
  allProducts: undefined,
  categoriesTablePage: 0,
  categoriesTableSize: 10,
  totalNumOfCategories: 0,
  subcategories: undefined,
  individualProductData: undefined,
  individualCategoryData: undefined,
  editProduct: false,
  editCategory: false,
  productNotes: undefined,
  productNotesSuccessFlag: false,
  //Vendors
  vendorId: 0,
  individualVendorData: undefined,
  fileId: 0,
  filteredFile: undefined,
  vendorFilesSuccessFlag: false,
  vendorNotesSuccessFlag: false,
  vendorsSuccessFlag: false,
  vendorsTablePage: 0,
  vendorsTableSize: 10,
  totalNumOfVendors: 0,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    toggleProductsSuccessFlag: (state) => {
      state.productsSuccessFlag = !state.productsSuccessFlag;
    },
    toggleCategoriesSuccessFlag: (state) => {
      state.categoriesSuccessFlag = !state.categoriesSuccessFlag;
    },
    setCatalogFilterType(state, action: PayloadAction<string>) {
      state.catalogFilterType = action.payload;
    },
    storeProductId(state, action: PayloadAction<number>) {
      state.productId = action.payload;
    },
    storeCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setProductsFilter(state, action: PayloadAction<boolean>) {
      state.showProductsFilter = action.payload;
    },
    storeProductsTablePage(state, action: PayloadAction<number>) {
      state.productsTablePage = action.payload;
    },
    storeProductsTableSize(state, action: PayloadAction<number>) {
      state.productsTableSize = action.payload;
    },
    storeTotalNumOfProducts(state, action: PayloadAction<number>) {
      state.totalNumOfProducts = action.payload;
    },
    storeAllProducts(state, action: PayloadAction<any>) {
      state.allProducts = action.payload;
    },
    storeCategoriesTablePage(state, action: PayloadAction<number>) {
      state.categoriesTablePage = action.payload;
    },
    storeCategoriesTableSize(state, action: PayloadAction<number>) {
      state.categoriesTableSize = action.payload;
    },
    storeTotalNumOfCategories(state, action: PayloadAction<number>) {
      state.totalNumOfCategories = action.payload;
    },
    storeSubcategories(state, action: PayloadAction<Array<any>>) {
      state.subcategories = action.payload;
    },
    storeIndividualProductData(state, action: PayloadAction<any>) {
      state.individualProductData = action.payload;
    },
    storeIndividualCategoryData(state, action: PayloadAction<any>) {
      state.individualCategoryData = action.payload;
    },
    toggleEditProduct(state) {
      state.editProduct = !state.editProduct;
    },
    toggleEditCategory(state) {
      state.editCategory = !state.editCategory;
    },
    storeProductNotes(state, action: PayloadAction<any>) {
      state.productNotes = action.payload;
    },
    toggleProductNotesSuccessFlag(state) {
      state.productNotesSuccessFlag = !state.productNotesSuccessFlag;
    },
    //Vendors
    storeVendorId(state, action: PayloadAction<number>) {
      state.vendorId = action.payload;
    },
    storeIndividualVendorData(state, action: PayloadAction<any>) {
      state.individualVendorData = action.payload;
    },
    storeFileId(state, action: PayloadAction<number>) {
      state.fileId = action.payload;
    },
    storeFilteredFile(state, action: PayloadAction<any>) {
      state.filteredFile = action.payload;
    },
    toggleVendorFilesSuccessFlag(state) {
      state.vendorFilesSuccessFlag = !state.vendorFilesSuccessFlag;
    },
    toggleVendorNotesSuccessFlag(state) {
      state.vendorNotesSuccessFlag = !state.vendorNotesSuccessFlag;
    },
    toggleVendorsSuccessFlag(state) {
      state.vendorsSuccessFlag = !state.vendorsSuccessFlag;
    },
    storeVendorsTablePage(state, action: PayloadAction<number>) {
      state.vendorsTablePage = action.payload;
    },
    storeVendorsTableSize(state, action: PayloadAction<number>) {
      state.vendorsTableSize = action.payload;
    },
    storeTotalNumOfVendors(state, action: PayloadAction<number>) {
      state.totalNumOfVendors = action.payload;
    },
  },
});

export const {
  toggleProductsSuccessFlag,
  toggleCategoriesSuccessFlag,
  setCatalogFilterType,
  storeProductId,
  storeCategoryId,
  setProductsFilter,
  storeProductsTablePage,
  storeProductsTableSize,
  storeTotalNumOfProducts,
  storeAllProducts,
  storeCategoriesTablePage,
  storeCategoriesTableSize,
  storeTotalNumOfCategories,
  storeSubcategories,
  storeIndividualProductData,
  storeIndividualCategoryData,
  toggleEditProduct,
  toggleEditCategory,
  storeProductNotes,
  toggleProductNotesSuccessFlag,
  //Vendors
  storeVendorId,
  storeIndividualVendorData,
  storeFileId,
  storeFilteredFile,
  toggleVendorFilesSuccessFlag,
  toggleVendorNotesSuccessFlag,
  toggleVendorsSuccessFlag,
  storeVendorsTablePage,
  storeVendorsTableSize,
  storeTotalNumOfVendors,
} = catalogSlice.actions;
export default catalogSlice.reducer;
