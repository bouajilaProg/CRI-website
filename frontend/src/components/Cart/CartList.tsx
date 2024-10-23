import CartItem from './CartItem';

// Updated CartItem type to include materialId and corrected description
type CartItemType = {
  materialId: number; // Add materialId here
  materielName: string;
  description: string; // Corrected spelling from "desciption" to "description"
  qte: number;
};

function CartList({ materielList }: { materielList: CartItemType[] }) {
  return (
    <div className="flex-[3]">
      <div>
        {materielList.map((materiel, index) => (
          <CartItem
            key={index}
            materialId={materiel.materialId} // Pass materialId to CartItem
            materielName={materiel.materielName}
            description={materiel.description} // Corrected spelling
            qte={materiel.qte}
          />
        ))}
      </div>
    </div>
  );
}

export default CartList;
