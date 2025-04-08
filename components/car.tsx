export function Car() {
  return (
    <div className="relative" style={{ width: "60px", height: "30px" }}>
      {/* Car body */}
      <div
        className="absolute"
        style={{
          width: "60px",
          height: "20px",
          backgroundColor: "#7DF9FF",
          borderRadius: "5px",
          bottom: 0,
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      />

      {/* Car top */}
      <div
        className="absolute"
        style={{
          width: "40px",
          height: "15px",
          backgroundColor: "#7DF9FF",
          borderRadius: "5px 5px 0 0",
          bottom: "15px",
          left: "10px",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.1)",
        }}
      />

      {/* Wheels */}
      <div
        className="absolute bg-black rounded-full"
        style={{
          width: "12px",
          height: "12px",
          bottom: "-5px",
          left: "10px",
        }}
      />
      <div
        className="absolute bg-black rounded-full"
        style={{
          width: "12px",
          height: "12px",
          bottom: "-5px",
          right: "10px",
        }}
      />

      {/* Windows */}
      <div
        className="absolute bg-[#4d4d4f]"
        style={{
          width: "15px",
          height: "8px",
          bottom: "17px",
          left: "12px",
          borderRadius: "2px",
        }}
      />
      <div
        className="absolute bg-[#4d4d4f]"
        style={{
          width: "15px",
          height: "8px",
          bottom: "17px",
          right: "12px",
          borderRadius: "2px",
        }}
      />

      {/* Headlights */}
      <div
        className="absolute bg-[#ff6b6b]"
        style={{
          width: "5px",
          height: "5px",
          bottom: "5px",
          left: "2px",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute bg-white"
        style={{
          width: "5px",
          height: "5px",
          bottom: "5px",
          right: "2px",
          borderRadius: "50%",
        }}
      />

      {/* Car shadow */}
      <div
        className="absolute bg-black/10 rounded-full blur-sm"
        style={{
          width: "50px",
          height: "10px",
          bottom: "-10px",
          left: "5px",
          zIndex: -1,
        }}
      />
    </div>
  )
}
