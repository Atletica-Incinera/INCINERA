"use client";

import { useEffect, useRef, RefObject } from "react";

interface Point {
  x: number;
  y: number;
}

// Function to calculate the area of a triangle given its three vertices
function getTriangleArea(A: Point, B: Point, C: Point) {
  return Math.abs((A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2);
}

// Function to check if a point P is inside the triangle formed by A, B, and C
function isPointInTriangle(p: Point, a: Point, b: Point, c: Point) {
  const A = getTriangleArea(a, b, c);
  const A1 = getTriangleArea(p, b, c);
  const A2 = getTriangleArea(a, p, c);
  const A3 = getTriangleArea(a, b, p);
  // Allow a small margin of floating point error
  return Math.abs(A - (A1 + A2 + A3)) < 1;
}

export function useSafeTriangle({
  triggerRef,
  menuRef,
  isOpen,
  onClose,
  delay = 300,
}: {
  triggerRef: RefObject<HTMLElement | null>;
  menuRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
  delay?: number;
}) {
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const lastMousePosRef = useRef<Point | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!triggerRef.current || !menuRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const mousePos = { x: e.clientX, y: e.clientY };

      const isOverMenu =
        mousePos.x >= menuRect.left &&
        mousePos.x <= menuRect.right &&
        mousePos.y >= menuRect.top &&
        mousePos.y <= menuRect.bottom;

      const isOverTrigger =
        mousePos.x >= triggerRect.left &&
        mousePos.x <= triggerRect.right &&
        mousePos.y >= triggerRect.top &&
        mousePos.y <= triggerRect.bottom;

      if (isOverTrigger || isOverMenu) {
        // If we're safe, cancel any pending close
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        lastMousePosRef.current = mousePos;
        return;
      }

      // Check if mouse is in the safe triangle
      if (lastMousePosRef.current) {
        const triggerCenter = {
          x: triggerRect.left + triggerRect.width / 2,
          y: triggerRect.top + triggerRect.height / 2,
        };
        const menuTopLeft = { x: menuRect.left, y: menuRect.top };
        const menuTopRight = { x: menuRect.right, y: menuRect.top };
        
        const inSafeTriangle = isPointInTriangle(mousePos, triggerCenter, menuTopLeft, menuTopRight);

        if (inSafeTriangle) {
          // Keep it open
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          return;
        }
      }

      // If we are not over menu, trigger, or in the safe triangle, initiate close timeout
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          onClose();
          timeoutRef.current = null;
        }, delay);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, onClose, delay, triggerRef, menuRef]);
}
