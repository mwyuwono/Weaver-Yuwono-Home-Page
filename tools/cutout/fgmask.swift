// Subject cutout mask via macOS Vision. Build: swiftc fgmask.swift -o fgmask
// Usage: ./fgmask in.jpg mask.png   (white = subject; apply with magick ... -compose CopyOpacity)
import Vision
import CoreImage
import AppKit
let a = CommandLine.arguments
let url = URL(fileURLWithPath: a[1])
let handler = VNImageRequestHandler(url: url)
let req = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([req])
guard let r = req.results?.first else { print("no subject"); exit(1) }
let buf = try r.generateScaledMaskForImage(forInstances: r.allInstances, from: handler)
let ci = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
let cg = ctx.createCGImage(ci, from: ci.extent)!
let rep = NSBitmapImageRep(cgImage: cg)
try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: a[2]))
print("ok", cg.width, cg.height)
