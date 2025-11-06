import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FlyToCartAnimationProps {
  startElement: HTMLElement | null;
  onComplete: () => void;
  imageUrl: string;
}

export function FlyToCartAnimation({
  startElement,
  onComplete,
  imageUrl,
}: FlyToCartAnimationProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    if (!startElement) return;

    // Получаем начальную позицию элемента
    const startRect = startElement.getBoundingClientRect();

    // Находим корзину (кнопка корзины справа внизу)
    const cartButton = document.querySelector(
      "[data-cart-button]"
    ) as HTMLElement;
    if (!cartButton) {
      onComplete();
      return;
    }

    const endRect = cartButton.getBoundingClientRect();

    // Размер анимируемого элемента
    const animSize = 80;

    // Рассчитываем позицию - берем X координату от начального элемента,
    // а Y - летит вниз к корзине
    const startX = startRect.left + startRect.width / 2 - animSize / 2;
    const startY = startRect.top + startRect.height / 2 - animSize / 2;

    // Конечная позиция - X остается как в начале, Y - центр корзины
    const endX = startX; // Не двигаемся по горизонтали
    const endY = endRect.top + endRect.height / 2 - animSize / 2;

    // Устанавливаем начальную позицию
    setPosition({ x: startX, y: startY });

    // Запускаем анимацию к корзине (только вниз)
    const timer = setTimeout(() => {
      setPosition({ x: endX, y: endY });
    }, 50);

    // Завершаем анимацию
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [startElement, onComplete]);

  if (!position) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "80px",
        height: "80px",
        borderRadius: "8px",
        overflow: "hidden",
        zIndex: 9999,
        pointerEvents: "none",
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
      }}
    >
      <img
        src={imageUrl}
        alt="Flying to cart"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>,
    document.body
  );
}
