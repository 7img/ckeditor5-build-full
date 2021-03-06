/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
// import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
//
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import LetterSpacing from './custom/LetterSpacing/LetterSpacing';
import LineHeight from './custom/LineHeight/LineHeight';
import HiddenText from './custom/HiddenText/HiddenText';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
  Essentials,
  UploadAdapter,
  Autoformat,
  Alignment,
  Clipboard,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  CKFinder,
  EasyImage,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
  Indent,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Base64UploadAdapter,
  LetterSpacing,
  LineHeight,
  LineHeight,
  HiddenText,
  CloudServices
];

// Editor configuration.
ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'fontFamily',
      'fontSize',
      'alignment'
    ]
  },
  image: {
    toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  language: 'en',
  fontFamily: {
    options: [
      'default',
      'Abel',
      'Anton',
      'Archivo Narrow',
      'Arvo',
      'Asap',
      'Baloo Bhai',
      'Bitter',
      'Bree Serif',
      'Cabin',
      'Catamaran',
      'Crimson Text',
      'Cuprum',
      'David Libre',
      'Dosis',
      'Droid Sans',
      'Exo 2',
      'Exo',
      'Fira Sans',
      'Fjalla One',
      'Francois One',
      'Gidugu',
      'Hind',
      'Inconsolata',
      'Indie Flower',
      'Josefin Sans',
      'Karla',
      'Lalezar',
      'Lato',
      'Libre Baskerville',
      'Lobster',
      'Lora',
      'Merriweather Sans',
      'Montserrat',
      'Muli',
      'Noto Serif',
      'Nunito',
      'Open Sans Condensed',
      'Open Sans',
      'Oswald',
      'Oxygen',
      'PT Sans',
      'PT Serif',
      'Pacifico',
      'Playfair Display',
      'Poiret One',
      'Poppins',
      'Quicksand',
      'Raleway',
      'Roboto Condensed',
      'Roboto Mono',
      'Roboto Slab',
      'Roboto',
      'Ruslan Display',
      'Signika',
      'Slabo',
      'Titillium Web',
      'Ubuntu Condensed',
      'Ubuntu',
      'Varela Round',
      'Yanone Kaffeesatz'
    ]
  },
  fontSize: {
    options: [
      '8px',
      '9px',
      '10px',
      '11px',
      '12px',
      '13px',
      'default',
      '15px',
      '16px',
      '17px',
      '18px',
      '19px',
      '20px',
      '21px',
      '22px',
      '23px',
      '24px',
      '25px',
      '26px',
      '27px',
      '28px',
      '36px',
      '42px',
      '48px',
      '56px'
    ]
  },
  letterSpacing: {
    options: ['default', 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]
  },
  alignment: {
    options: ['left', 'center', 'right']
  },
  mediaEmbed: {
    removeProviders: ['instagram', 'twitter', 'googleMaps', 'flickr', 'facebook'],
    extraProviders: [
      {
        name: 'custom',
        url: /.*/,
        html: match => {
          const url = match[0];

          return (
            '<div style="position: relative;">' +
            `<video controls>
                <source src="${url}">
                Sorry, your browser doesn't support embedded videos.
            ` +
            '</video>' +
            '</div>'
          );
        }
      }
    ]
  }
};
