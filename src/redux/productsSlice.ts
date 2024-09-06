import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from './types';
import { fetchProducts as fetchProductsApi, fetchProductById as fetchProductByIdApi } from '../services/api';

const initialState: ProductState = {
  products: [
    {
      id: '1',
      title: 'Голландский цветной карлик',
      description: 'Порода, которая была получена в Нидерландах. Официально она признана в 1940 году. Для ее получения использовали гермелинов и местных некрупных кроликов. В России такие животные появились в 2013 году.',
      image: 'https://i1.wp.com/tvoikrolik.com/wp-content/uploads/2017/02/%D0%A6%D0%B2%D0%B5%D1%82%D0%BD%D0%BE%D0%B9-%D0%BA%D0%B0%D1%80%D0%BB%D0%B8%D0%BA%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BA%D1%80%D0%BE%D0%BB%D0%B8%D0%BA-%D1%84%D0%BE%D1%82%D0%BE.jpg',
      liked: true,
    },
    { id: '2', title: 'Нидерландский карликовый кролик', description: 'Родоначальником породы является красноглазый гермелин. Они получили распространение по всему миру. В Россию этих кроликов завезли из Финляндии в 2014 году. Различают две линии породы: английская и американская.', image: 'https://board.mur.tv/uploads/images/listings/zi/3/w53yq.jpg', liked: true },
    { id: '3', title: 'Сатиновый карлик', description: 'Эти животные были выведены в Германии. Для их получения скрещивали обычных лисьих кроликов среднего размера и миниатюрных гермелинов, также использовались карликовые ангорские кролики для удлинения шерсти.', image: 'https://7sotok.com/wp-content/uploads/2021/09/dekor_krolik_8.jpg', liked: false },
    { id: '4', title: 'Карликовый русак', description: 'Эти кролики очень похожи на обыкновенных зайцев с пропорциональным телом, без каких-либо особенностей строения. Окрас может быть, как чисто белым, так и с вкраплениями других цветов. Единственный нюанс – пятна могут появляться через некоторое время после рождения', image: 'https://baldezh.top/uploads/posts/2022-05/1652814315_46-funart-pro-p-kroliki-germelini-zhivotnie-krasivo-foto-48.jpg', liked: false },
    { id: '5', title: 'Мини лоп', description: 'Порода выведена в Германии. Этих зверьков получили от скрещивания нидерландских вислоухих баранов и карликовых шиншилл. Первые мини лопы были белыми, но в дальнейшем были получены и другие окрасы. Официально порода была признана в 1980 году.', image: 'https://7sotok.com/wp-content/uploads/2021/09/dekor_krolik_20.jpg', liked: false },
    { id: '6', title: 'Ангорский карликовый кролик', description: 'Представителей этой породы можно легко перепутать с обычном комком шерсти или меха, из-за этой особенности очень сложно разглядеть у животного глазки или носик. На ощупь – это самое мягкое и приятное существо, которое только вам доведётся погладить.Тельце у животного цилиндрической формы, голова круглая, а глазки посажены неглубоко. Уши небольшие и только слегка выглядывают из шерсти. Из-за густого и длинного «оперения», за кроликами данной породы необходимо очень тщательно ухаживать, да и сам уход является совсем не простым: поскольку мех требует постоянного внимания.', image: 'https://th.bing.com/th/id/R.1e2e1d0d14cd3ac534eac20a038c57b2?rik=DgH4SSybbTxg2g&amp;pid=ImgRaw&amp;r=0', liked: true },
  ],
  selectedProduct: null,
  status: 'idle',
  filter: 'all',
};



// Асинхронные действия
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const products = await fetchProductsApi();
    return products;
  }
);

export const fetchProductById = createAsyncThunk<Product, string>(
  'products/fetchProductById',
  async (id) => {
    const product = await fetchProductByIdApi(id);
    return product;
  }
);

// Создание слайса
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    setFilter(state, action: PayloadAction<'all' | 'liked'>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        console.log('Fetched products:', action.payload);
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const { toggleLike, removeProduct, addProduct, setFilter } = productSlice.actions;

export default productSlice.reducer;
