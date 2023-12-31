import { useEffect, useState } from "react";

import { getProduct } from "../../services/operations/product";


export default function SelectProduct({ products, setSelectedProducts }) {

    const [selectedProduct, setSelectedProduct] = useState("");

    const [entryData, setEntryData] = useState({
        // product attribute will be name of product(always unique)
        product: "", price: 0, quantity: 0, height: 0, width: 0,
    });

    async function sumbitHanlder(e) {
        e.preventDefault();
        entryData.productName = selectedProduct.productName;
        setSelectedProducts(prev => ([...prev, entryData]))
        setEntryData({ product: "", price: 0, quantity: 0, height: 0, width: 0 });
    }

    function changeHandler(e) {
        setEntryData(prevData => {
            // return the object with previous field(data) and update target field
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }


    async function fetchProduct(productId) {
        const productData = await getProduct(productId);
        if (productData) {
            setSelectedProduct(productData);
        }
        return
    };


    useEffect(() => {
        fetchProduct(entryData?.product);
    }, [entryData?.product])


    return (
        <form onSubmit={sumbitHanlder} className="mb-3 flex flex-col gap-4 flex-wrap shadow-sm shadow-blue-300 p-4">

            <p className="text-lg text-center text-rose-400">Add products...</p>

            <div className="flex flex-col gap-3 items-start">

                {/* product name */}
                <div className="flex flex-col w-full gap-1 justify-center">
                    <label htmlFor="product">Product</label>
                    <select
                        name="product"
                        required
                        value={entryData.product}
                        onChange={changeHandler}
                        className="p-[6px] px-4 rounded text-black outline-none"
                    >
                        <option value="" disabled>
                            Choose an product
                        </option>
                        {
                            products?.map((product) => {
                                return (
                                    <option value={product._id} key={product._id}>{product.productName}</option>
                                )
                            })
                        }
                    </select>
                </div>

                

                {/* Height , width and area if unit is not piece */}
                {
                    selectedProduct?.unit !== "piece" &&
                    <div className="flex gap-12 w-full">

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="height">Height  </label>
                            <input
                                type="number"
                                name="height"
                                required
                                value={entryData.height}
                                onChange={changeHandler}
                                className="p-1 rounded text-black outline-none"
                            />

                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="width">Width</label>
                            <input
                                type="number"
                                name="width"
                                required
                                value={entryData.width}
                                onChange={changeHandler}
                                className="p-1 rounded text-black outline-none"
                            />
                        </div>

                        {/* <div className="flex flex-col w-full gap-1">
                            <label htmlFor="area">Area :({selectedProduct.unit})</label>
                            <input
                                type="number"
                                name="area"
                                value={entryData?.height * entryData?.width}
                                readOnly
                                className="p-1 rounded text-black outline-none"
                            />
                        </div> */}


                    </div>
                }

                {/* current stock, quantity and price */}
                <div className="flex gap-10 w-full">

                    {/* <div className="flex flex-col w-full gap-1">
                        <p>Current Stock </p>
                        <p className="rounded p-[6px] px-4 bg-slate-600 text-white">{selectedProduct.currentStock || 0}</p>
                    </div> */}

                    <div className="flex flex-col w-full gap-1 justify-center">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            required
                            value={entryData.quantity}
                            onChange={changeHandler}
                            className="p-1 rounded text-black outline-none"
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1 justify-center">
                        <label htmlFor="price">Price (Rs.)</label>
                        <input
                            type="number"
                            name="price"
                            required
                            value={entryData.price}
                            onChange={changeHandler}
                            className="p-1 rounded text-black outline-none"
                        />
                    </div>

                </div>


                {
                    // (selectedProduct.currentStock - entryData.quantity < 0) && isSellOrder ? (
                    //     <p className="rounded p-2 px-6 text-rose-600">Not enough stock</p>
                    // ) : (
                    //     <button className="rounded mt-2 p-2 px-6 bg-slate-600">Add</button>
                    // )
                    <button className="rounded mt-2 p-2 px-6 bg-blue-700 hover:bg-blue-500">Add</button>
                }



            </div>



        </form>
    )
}