import {File, RightCheckmark} from '@assets/Icons';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import {DocumentPickerResponse, pick} from '@react-native-documents/picker';
import {scaleWidth, scaleHeight, scaleFont} from '@utils/Scale';
import {tryCatch} from '@utils/TryCatch';
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

export const UploadModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: (file?: DocumentPickerResponse) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<
    DocumentPickerResponse | undefined
  >();

  const handleBrowseFile = async () => {
    const {data, error} = await tryCatch(
      pick({
        mode: 'import',
        allowMultiSelection: false,
      });
      if (files && files[0]) {
        setSelectedFile(files[0].name || 'Document Selected');
      }
    } catch (error) {
      console.log('Document picking error:', error);
    }
  };

  const handleOpenCamera = async () => {
    const result = await launchCamera({mediaType: 'photo', saveToPhotos: true});
    if (result?.assets && result.assets.length > 0) {
      setSelectedImageUri(result.assets[0].uri || null);
      setSelectedFile(null); // clear file name if using camera
    }
  };

  const handleSubmit = () => {
    onClose(selectedFile);
  };
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => onClose()}>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('Outside modal pressed - closing');
          onClose();
        }}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popup}>
              <Text style={styles.title}>Upload your File</Text>
              <Text style={styles.subtitle}>Supports JPG, PNG and PDF</Text>

              <View style={styles.uploadBox}>
                <File width={20} height={26} />
                <Text style={styles.info}>Max file size 15MB</Text>
                {/* <Text style={styles.info}>Drag & Drop your file or</Text> */}
 
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.browseButton}
                    onPress={handleBrowseFile}>
                    <Text style={styles.browseText}>Browse File</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.browseButton,
                      {backgroundColor: '#28a745', marginTop: 10},
                    ]}
                    onPress={handleOpenCamera}>
                    <Text style={styles.browseText}>Take Photo</Text>
                  </TouchableOpacity>

                  {selectedFile && (
                    <Text style={{marginTop: 8, color: '#444', fontSize: 14}}>
                      Selected: {selectedFile.name}
                    </Text>
                  )}

                  {selectedImageUri && (
                    <Image
                      source={{uri: selectedImageUri}}
                      style={{
                        marginTop: 10,
                        width: 120,
                        height: 120,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: '#ccc',
                      }}
                      resizeMode="cover"
                    />
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                activeOpacity={0.7}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={styles.saveText}>Submit</Text>
                <RightCheckmark width={12} height={12} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {fontSize: 20, fontWeight: '600', marginBottom: 4},
  subtitle: {fontSize: 14, color: '#666', marginBottom: 16},
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FAFAFA',
  },
  info: {fontSize: 14, color: '#666', textAlign: 'center'},
  browseButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 10,
  },
  browseText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    marginTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(4),
    gap: scaleWidth(8),
    borderWidth: 1,
    borderColor: Colors.green,
    minWidth: scaleWidth(100),
  },
  saveText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: scaleFont(14),
  },
});
