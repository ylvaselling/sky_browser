// Copyright 2020 the .NET Foundation
// Licensed under the MIT License

/** Mapping JSON-serialized settings to runtime values.
 */

 import {
  AltTypes,
  AltUnits,
  CoordinatesType,
  MarkerScales,
  PlotTypes,
  PointScaleTypes,
  RAUnits,
} from "@wwtelescope/engine-types";

import {
  Color,
  SpreadSheetLayer,
  SpreadSheetLayerSetting,
} from "@wwtelescope/engine";

import {
  classicPywwt,
} from "@wwtelescope/research-app-messages";

function colValToIndex(layer: SpreadSheetLayer, colval: number | string): number {
  if (typeof colval === "number")
    return colval;
  return layer.get_header().indexOf(colval);
}

// TODO: can't dig up a cleaner way to map enum item names as strings to their
// values. I feel like I must be doing something wrong? But:
// https://github.com/microsoft/TypeScript/issues/592

const typedAltTypes: { [ix: string]: AltTypes | undefined } = AltTypes as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const typedAltUnits: { [ix: string]: AltUnits | undefined } = AltUnits as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const typedCoordinatesType: { [ix: string]: CoordinatesType | undefined } = CoordinatesType as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const typedMarkerScales: { [ix: string]: MarkerScales | undefined } = MarkerScales as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const typedPlotTypes: { [ix: string]: PlotTypes | undefined } = PlotTypes as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const typedRAUnits: { [ix: string]: RAUnits | undefined } = RAUnits as any; // eslint-disable-line @typescript-eslint/no-explicit-any

function mapEnumSetting<T, E>(name: T, typemap: { [ix: string]: E | undefined}, ix: string): [T, E] | null {
  const m = typemap[ix];

  if (m === undefined)
    return null;

  return [name, m];
}

export function convertPywwtSpreadSheetLayerSetting(setting: classicPywwt.PywwtSpreadSheetLayerSetting, layer: SpreadSheetLayer): SpreadSheetLayerSetting | null {
  if (setting[0] == "altColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "altType") {
    return mapEnumSetting(setting[0], typedAltTypes, setting[1]);
  } else if (setting[0] == "altUnit") {
    return mapEnumSetting(setting[0], typedAltUnits, setting[1]);
  } else if (setting[0] == "cartesianScale") {
    return mapEnumSetting(setting[0], typedAltUnits, setting[1]);
  } else if (setting[0] == "color") {
    return [setting[0], Color.fromHex(setting[1])];
  } else if (setting[0] == "colorMapColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "coordinatesType") {
    return mapEnumSetting(setting[0], typedCoordinatesType, setting[1]);
  } else if (setting[0] == "endDateColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "geometryColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "hyperlinkColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "latColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "lngColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "markerColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "markerScale") {
    return mapEnumSetting(setting[0], typedMarkerScales, setting[1]);
  } else if (setting[0] == "nameColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "plotType") {
    return mapEnumSetting(setting[0], typedPlotTypes, setting[1]);
  } else if (setting[0] == "pointScaleType") {
    // Unusual: pywwt sends this one as a number not a string
    if (setting[1] in PointScaleTypes) {
      return [setting[0], setting[1] as PointScaleTypes];
    } else {
      return null;
    }
  } else if (setting[0] == "raUnits") {
    return mapEnumSetting(setting[0], typedRAUnits, setting[1]);
  } else if (setting[0] == "sizeColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "startDateColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "xAxisColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "yAxisColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  } else if (setting[0] == "zAxisColumn") {
    return [setting[0], colValToIndex(layer, setting[1])];
  }

  return setting;
}