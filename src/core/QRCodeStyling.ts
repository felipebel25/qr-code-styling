import getMode from "../tools/getMode";
import mergeDeep from "../tools/merge";
import downloadURI from "../tools/downloadURI";
import QRCanvas from "./QRCanvas";
import drawTypes from "../constants/drawTypes";

import defaultOptions, { RequiredOptions } from "./QROptions";
import sanitizeOptions from "../tools/sanitizeOptions";
import { Extension, QRCode, Options, DownloadOptions } from "../types";
import qrcode from "qrcode-generator";

export default class QRCodeStyling {
  _options: RequiredOptions;
  _container?: HTMLElement;
  _canvas?: QRCanvas;
  _qr?: QRCode;
  _canvasDrawingPromise?: Promise<void>;
  _svgDrawingPromise?: Promise<void>;

  constructor(options?: Partial<Options>) {
    this._options = options ? sanitizeOptions(mergeDeep(defaultOptions, options) as RequiredOptions) : defaultOptions;
    this.update();
  }

  static _clearContainer(container?: HTMLElement): void {
    if (container) {
      container.innerHTML = "";
    }
  }

  async _getQRStylingElement(extension: Extension = "png"): Promise<QRCanvas> {
    if (!this._qr) throw "QR code is empty";

    let promise, canvas: QRCanvas;

    if (this._canvas && this._canvasDrawingPromise) {
      canvas = this._canvas;
      promise = this._canvasDrawingPromise;
    } else {
      canvas = new QRCanvas(this._options);
      promise = canvas.drawQR(this._qr);
    }

    await promise;

    return canvas;
  }

  update(options?: Partial<Options>): void {
    QRCodeStyling._clearContainer(this._container);
    this._options = options ? sanitizeOptions(mergeDeep(this._options, options) as RequiredOptions) : this._options;

    if (!this._options.data) {
      return;
    }

    this._qr = qrcode(this._options.qrOptions.typeNumber, this._options.qrOptions.errorCorrectionLevel);
    this._qr.addData(this._options.data, this._options.qrOptions.mode || getMode(this._options.data));
    this._qr.make();

    if (this._options.type === drawTypes.canvas) {
      this._canvas = new QRCanvas(this._options);
      this._canvasDrawingPromise = this._canvas.drawQR(this._qr);
      this._svgDrawingPromise = undefined;
    }
    this.append(this._container);
  }

  append(container?: HTMLElement): void {
    if (!container) {
      return;
    }

    if (typeof container.appendChild !== "function") {
      throw "Container should be a single DOM node";
    }

    if (this._options.type === drawTypes.canvas) {
      if (this._canvas) {
        container.appendChild(this._canvas.getCanvas());
      }
    }

    this._container = container;
  }

  async getRawData(extension: Extension = "png"): Promise<Blob | null> {
    if (!this._qr) throw "QR code is empty";
    const element = await this._getQRStylingElement(extension);

    return new Promise((resolve) =>
      (element as unknown as QRCanvas).getCanvas().toBlob(resolve, `image/${extension}`, 1)
    );
  }

  async download(downloadOptions?: Partial<DownloadOptions> | string): Promise<void> {
    if (!this._qr) throw "QR code is empty";
    let extension = "png" as Extension;
    let name = "qr";

    //TODO remove deprecated code in the v2
    if (typeof downloadOptions === "string") {
      extension = downloadOptions as Extension;
      console.warn(
        "Extension is deprecated as argument for 'download' method, please pass object { name: '...', extension: '...' } as argument"
      );
    } else if (typeof downloadOptions === "object" && downloadOptions !== null) {
      if (downloadOptions.name) {
        name = downloadOptions.name;
      }
      if (downloadOptions.extension) {
        extension = downloadOptions.extension;
      }
    }

    const element = await this._getQRStylingElement(extension);

    const url = (element as unknown as QRCanvas).getCanvas().toDataURL(`image/${extension}`);
    downloadURI(url, `${name}.${extension}`);
  }
}
