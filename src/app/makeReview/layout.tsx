// app/about-us/layout.tsx
export default function MakeReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Any specific layout elements for About Us page */}
      {children}
    </div>
  );
}
